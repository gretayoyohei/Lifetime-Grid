/* ========= 全局命名空间 ========= */
var LC = window.LC = {};

/* ========= 布局常量 ========= */
LC.HDR=10;LC.DPAD=2;LC.DGAP=1.5;LC.DW=LC.DH=LC.HDR;
LC.MW=LC.MH=2*LC.DPAD+7*LC.DW+6*LC.DGAP;
LC.MPAD=7;
LC.YW=(4+1)*LC.MPAD+4*LC.MW;
LC.YH=(3+1)*LC.MPAD+3*LC.MH;
LC.YGAP=26;LC.YPR=10;
LC.ZY_HIDE_S=1.3;LC.ZY_HIDE_E=2.1;
LC.ZM_SHOW=1.6;LC.ZM_FULL=2.4;
LC.ZMO_HIDE_S=5.0;LC.ZMO_HIDE_E=6.5;
LC.ZYM_S=5.5;LC.ZYM_E=7.0;
LC.ZD_SHOW=6.0;LC.ZD_FULL=8.0;
LC.ZEV=16;

/* ========= 事件颜色配置 ========= */
LC.EC = { p:'#ffe693', h:'#6cc6b8', i:'#ff7369', w:'#57baf1', s:'#fcb25f', a:'#6bdbda', b:'#baaeef', o:'#ffa4de' };

/* ========= 存储 key ========= */
LC.STORE='lifeCalV5';LC.LANG_KEY='lifeCalLang5';

/* ========= 共享状态 ========= */
LC.curLang=localStorage.getItem(LC.LANG_KEY)||'zh-CN';
LC.ud=null;
LC.birthYr=0;LC.totalYrs=0;LC.gridW=0;LC.gridH=0;
LC.zoom=.5;LC.tZoom=.5;LC.cx=0;LC.cy=0;LC.targetCx=undefined;LC.targetCy=undefined;
LC.anchWX=0;LC.anchWY=0;LC.anchSX=0;LC.anchSY=0;LC.hasAnch=false;
LC.dragging=false;LC.dragX0=0;LC.dragY0=0;LC.cx0=0;LC.cy0=0;LC.movedDist=0;
LC.t0Dist=0;LC.t0Zoom=0;
LC.W=0;LC.H=0;LC.dpr=1;
LC.showBgAnim=true;
LC.ctxEventId=null;
LC.currentSidebarDate=null;
LC.dayEventRects=[];
LC.dragState=null;
LC.isResizingSidebar=false;LC.sidebarStartX=0;LC.sidebarStartW=0;
LC.TODAY='';
LC.originalLifeExp=null;  // 用于记录原始寿命值，检测用户是否改小寿命

/* ========= Canvas 引用 ========= */
LC.cvs=null;LC.ctx=null;LC.bgCvs=null;LC.bgCtx=null;

/* ========= 工具函数 ========= */
LC.clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
LC.lerp=function(a,b,t){return a+(b-a)*t};
LC.fadeI=function(z,s,e){return LC.clamp((z-s)/(e-s),0,1)};
LC.fadeO=function(z,s,e){return 1-LC.fadeI(z,s,e)};
LC.fmtDate=function(y,m,d){return y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0')};
LC.todayStr=function(){var n=new Date();return LC.fmtDate(n.getFullYear(),n.getMonth(),n.getDate())};
LC.TODAY=LC.todayStr();
LC.calcAge=function(bdStr){var bd=new Date(bdStr+'T00:00:00'),now=new Date();var a=now.getFullYear()-bd.getFullYear();if(now.getMonth()<bd.getMonth()||(now.getMonth()===bd.getMonth()&&now.getDate()<bd.getDate()))a--;return a};
LC.w2s=function(wx,wy){return{x:(wx-LC.cx)*LC.zoom+LC.W/2,y:(wy-LC.cy)*LC.zoom+LC.H/2}};
LC.s2w=function(sx,sy){return{x:(sx-LC.W/2)/LC.zoom+LC.cx,y:(sy-LC.H/2)/LC.zoom+LC.cy}};
LC.yrPos=function(i){return{x:i%LC.YPR*(LC.YW+LC.YGAP),y:Math.floor(i/LC.YPR)*(LC.YH+LC.YGAP)}};
LC.moPos=function(m){return{x:LC.MPAD+(m%4)*(LC.MW+LC.MPAD),y:LC.MPAD+Math.floor(m/4)*(LC.MH+LC.MPAD)}};
LC.dayPos=function(dow,wr){return{x:LC.DPAD+dow*(LC.DW+LC.DGAP),y:LC.HDR+LC.DPAD+wr*(LC.DH+LC.DGAP)}};
LC.rRect=function(x,y,w,h,r){r=Math.min(r,Math.max(.1,w/2),Math.max(.1,h/2));LC.ctx.beginPath();LC.ctx.moveTo(x+r,y);LC.ctx.arcTo(x+w,y,x+w,y+h,r);LC.ctx.arcTo(x+w,y+h,x,y+h,r);LC.ctx.arcTo(x,y+h,x,y,r);LC.ctx.arcTo(x,y,x+w,y,r);LC.ctx.closePath()};
LC.monthInfo=function(y,m){return{days:new Date(y,m+1,0).getDate(),dow1:new Date(y,m,1).getDay()}};

/* ========= 检查日程是否在指定日期显示（支持重复和例外） ========= */
LC.shouldShowEventOnDate=function(ev, ds){
  // 检查是否在例外列表中
  if(ev.exceptions && ev.exceptions.indexOf(ds) !== -1) {
    return false;
  }
  
  var sD = ev.startDate || ev.date;
  var eD = ev.endDate || ev.date;
  
  // 首先检查是否在原始日期范围内
  if(ds >= sD && ds <= eD) return true;
  
  // 如果没有重复规则，不再扩展
  if(!ev.repeat || ev.repeat === 'none') return false;
  
  var targetDate = new Date(ds + 'T00:00:00');
  var startDate = new Date(sD + 'T00:00:00');
  var repeat = ev.repeat;
  
  // 根据重复类型计算
  switch(repeat) {
    case 'daily': {
      return targetDate >= startDate;
    }
    case 'weekly': {
      if(targetDate < startDate) return false;
      var daysDiff = Math.floor((targetDate - startDate) / (24 * 60 * 60 * 1000));
      return daysDiff % 7 === 0;
    }
    case 'monthly': {
      if(targetDate < startDate) return false;
      var targetYear = targetDate.getFullYear();
      var targetMonth = targetDate.getMonth();
      var targetDay = targetDate.getDate();
      var startDay = startDate.getDate();
      
      var daysInTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
      var actualDay = Math.min(startDay, daysInTargetMonth);
      
      if(targetDay !== actualDay) return false;
      
      var monthDiff = (targetYear - startDate.getFullYear()) * 12 + (targetMonth - startDate.getMonth());
      return monthDiff > 0 && monthDiff % 1 === 0;
    }
    case 'yearly': {
      if(targetDate < startDate) return false;
      var targetYear = targetDate.getFullYear();
      var startYear = startDate.getFullYear();
      var targetMonth = targetDate.getMonth();
      var startMonth = startDate.getMonth();
      var targetDay = targetDate.getDate();
      var startDay = startDate.getDate();
      
      if(targetMonth !== startMonth || targetDay !== startDay) return false;
      
      var yearDiff = targetYear - startYear;
      return yearDiff > 0;
    }
    default:
      return false;
  }
};

/* ========= 获取日程（支持重复日程和例外） ========= */
LC.getEv=function(ds){
  if(!LC.ud||!LC.ud.events)return[];
  return LC.ud.events.filter(function(e){
    return LC.shouldShowEventOnDate(e, ds);
  });
};
LC.seededRand=function(s){var x=Math.sin(s*9301+49297)*233280;return x-Math.floor(x)};
LC.genId=function(){return Date.now().toString(36)+Math.random().toString(36).substr(2,5)};

/* ========= 存储 ========= */
LC.load=function(){try{var r=localStorage.getItem(LC.STORE);if(r){LC.ud=JSON.parse(r);return true}}catch(e){}return false};
LC.save=function(){if(LC.ud)localStorage.setItem(LC.STORE,JSON.stringify(LC.ud))};

/* ========= 画布尺寸 ========= */
LC.resize=function(){
  LC.dpr=window.devicePixelRatio||1;LC.W=innerWidth;LC.H=innerHeight;
  LC.cvs.width=LC.W*LC.dpr;LC.cvs.height=LC.H*LC.dpr;LC.cvs.style.width=LC.W+'px';LC.cvs.style.height=LC.H+'px';
  LC.bgCvs.width=LC.W*LC.dpr;LC.bgCvs.height=LC.H*LC.dpr;LC.bgCvs.style.width=LC.W+'px';LC.bgCvs.style.height=LC.H+'px';
};

/* ========= 初始化 Canvas DOM 引用 ========= */
LC.cvs=document.getElementById('calCanvas');
LC.ctx=LC.cvs.getContext('2d');
LC.bgCvs=document.getElementById('bgCanvas');
LC.bgCtx=LC.bgCvs.getContext('2d');
LC.resize();
addEventListener('resize',LC.resize);