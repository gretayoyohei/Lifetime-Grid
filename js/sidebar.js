/* ========= 侧边栏：24小时视图 ========= */
LC.openSidebar=function(ds){
  var sidebar = document.getElementById('sidebarOverlay');
  var header = document.getElementById('sidebarHeader');
  var fixedPart = document.getElementById('sidebarFixedPart');
  var scrollPart = document.getElementById('sidebarScrollPart');

  var isReopen = LC.currentSidebarDate === ds;
  var prevScroll = isReopen ? scrollPart.scrollTop : 0;

  LC.currentSidebarDate = ds;
  var evs = LC.getEv(ds).sort(function(a,b){ return (a.isAllDay?0:1)-(b.isAllDay?0:1) || (a.startTime||'').localeCompare(b.startTime||''); });
  var parts = ds.split('-');
  var dateLabel = parts[0] + '/' + parts[1];
  var dayLabel = parseInt(parts[2]);
  
  // 计算星期几（支持多语言）
  var weekdaysMap = {
    'zh-CN': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    'zh-TW': ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    'en': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'ja': ['日', '月', '火', '水', '木', '金', '土'],
    'ko': ['일', '월', '화', '수', '목', '금', '토'],
    'ar': ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    'es': ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    'fr': ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    'de': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    'it': ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
    'pt': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    'ru': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    'hi': ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
    'th': ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
  };
  var wdList = weekdaysMap[LC.curLang] || weekdaysMap['zh-CN'];
  var targetDate = new Date(ds + 'T00:00:00');
  var weekdayName = wdList[targetDate.getDay()];
  
  header.innerHTML = '<div class="sb-info" style="text-align:center;">'+dateLabel+'</div><div class="sb-date" style="text-align:center; display:flex; align-items:baseline; justify-content:center; gap:8px;">'+dayLabel+'<span style="font-size:0.9rem; font-weight:normal; color:#b0a090;">'+weekdayName+'</span></div>';

  var allDayEvs = evs.filter(function(e){return e.isAllDay});
  var fixedHtml = '<div class="all-day-slot"><h4>'+LC.t('sbt','All Day')+'</h4>';
  if(allDayEvs.length){
    allDayEvs.forEach(function(e){
      var c = LC.EC[e.type]||LC.EC.o;
      fixedHtml += '<div class="all-day-event" data-id="'+e.id+'" style="background:'+c+'44; border-left:3px solid '+c+'">'+e.title+'</div>';
    });
  } else {
    fixedHtml += '<div style="font-size:.78rem;color:#b0a090;text-align:center;padding:4px 0" onclick="openModal(\''+ds+'\')">+'+LC.t('et','New Event')+'</div>';
  }
  fixedHtml += '</div>';
  fixedPart.innerHTML = fixedHtml;

  // 全天日程左键点击弹出信息弹窗，右键弹出编辑/删除菜单
  var allDayEvEls = fixedPart.querySelectorAll('.all-day-event');
  allDayEvEls.forEach(function(el){
    // 左键点击：弹出信息弹窗
    el.addEventListener('click', function(e){
      e.stopPropagation();
      var evId = el.dataset.id;
      var ev = LC.ud.events.find(function(ev){ return ev.id === evId; });
      if(ev) LC.showInfoPopover(e.clientX, e.clientY, ev, LC.currentSidebarDate);
    });
    // 右键点击：弹出编辑/删除菜单
    el.addEventListener('contextmenu', function(e){
      e.preventDefault();
      e.stopPropagation();
      var evId = el.dataset.id;
      LC.showCtxMenu(e.clientX, e.clientY, evId, LC.currentSidebarDate);
    });
  });

  var timeEvs = evs.filter(function(e){ return !e.isAllDay; });
  var gridHtml = '<div class="time-grid">';

  for(var h=0;h<24;h++){
    var hStr = String(h).padStart(2,'0');
    var label = LC.tf('sbh',{h:hStr}, hStr+':00');
    gridHtml += '<div class="time-hour-row" data-hour="'+h+'">';
    gridHtml += '<div class="time-hour-label">'+label+'</div>';
    gridHtml += '<div class="time-hour-line"></div>';
    gridHtml += '</div>';
  }

  timeEvs.forEach(function(ev){
    var sParts = (ev.startTime||'09:00').split(':');
    var eParts = (ev.endTime||'10:00').split(':');
    ev.startMin = LC.clamp(parseInt(sParts[0])*60 + parseInt(sParts[1]), 0, 1440);
    ev.endMin = LC.clamp(parseInt(eParts[0])*60 + parseInt(eParts[1]), 0, 1440);
    if(ev.endMin <= ev.startMin) ev.endMin = ev.startMin + 15;
  });

  var layouts = LC.layoutEvents(timeEvs);
  layouts.forEach(function(layout){
    var ev = layout.ev;
    var c = LC.EC[ev.type]||LC.EC.o;
    var top = ev.startMin;
    var height = ev.endMin - ev.startMin;
    var widthPercent = 100 / layout.totalCols;
    var leftPercent = layout.col * widthPercent;

    gridHtml += '<div class="time-event-block" data-id="'+ev.id+'" data-startdate="'+ev.startDate+'" style="top:'+top+'px; height:'+height+'px; left:calc(65px + (100% - 75px) * '+leftPercent/100+'); width:calc((100% - 75px) * '+widthPercent/100+' - 4px); background:'+c+'33; border-color:'+c+';">';
    gridHtml += '<div class="resize-handle top"></div>';
    gridHtml += '<div class="ev-title">'+ev.title+'</div>';
    gridHtml += '<div class="ev-time">'+ev.startTime+'</div>';
    gridHtml += '<div class="resize-handle bottom"></div>';
    gridHtml += '</div>';
  });

  gridHtml += '</div>';
  scrollPart.innerHTML = gridHtml;

  sidebar.classList.add('active');

  if (!isReopen) {
    var now = new Date();
    if(ds === LC.todayStr()) {
      scrollPart.scrollTop = now.getHours() * 60 - 60;
    } else if(timeEvs.length) {
      scrollPart.scrollTop = Math.max(0, timeEvs[0].startMin - 30);
    }
  } else {
    scrollPart.scrollTop = prevScroll;
  }

  var evBlocks = scrollPart.querySelectorAll('.time-event-block');
  evBlocks.forEach(function(block){
    LC.bindDragEvent(block, ds);
  });

  // 点击时间区域弹出新建日程
  var hourRows = scrollPart.querySelectorAll('.time-hour-row');
  hourRows.forEach(function(row) {
    row.removeEventListener('click', LC.handleHourRowClick);
    row.addEventListener('click', LC.handleHourRowClick);
  });
  LC.currentSidebarDateForHourClick = ds;
};

// 处理时间行点击的函数
LC.handleHourRowClick = function(e) {
  e.stopPropagation();
  var ds = LC.currentSidebarDateForHourClick;
  var hour = parseInt(this.dataset.hour);
  if (!isNaN(hour)) {
    LC.openModal(ds, hour);
  } else {
    LC.openModal(ds, 9);
  }
};

LC.layoutEvents=function(events) {
  if(!events.length) return [];
  events.sort(function(a,b){ return a.startMin - b.startMin; });
  var columns = [];
  var evLayouts = [];

  events.forEach(function(ev){
    var placed = false;
    for(var i=0; i<columns.length; i++) {
      var lastInCol = columns[i][columns[i].length - 1];
      if(ev.startMin >= lastInCol.endMin) {
        columns[i].push(ev);
        ev._col = i;
        placed = true;
        break;
      }
    }
    if(!placed) {
      columns.push([ev]);
      ev._col = columns.length - 1;
    }
  });

  var groups = [];
  if(events.length) {
    var currentGroup = [events[0]];
    for(var i=1; i<events.length; i++) {
      var overlapsGroup = currentGroup.some(function(e){ return events[i].startMin < e.endMin; });
      if(overlapsGroup) {
        currentGroup.push(events[i]);
      } else {
        groups.push(currentGroup);
        currentGroup = [events[i]];
      }
    }
    groups.push(currentGroup);
  }

  groups.forEach(function(group){
    var maxCol = 0;
    group.forEach(function(ev){ if(ev._col > maxCol) maxCol = ev._col; });
    var totalCols = maxCol + 1;
    group.forEach(function(ev){
      evLayouts.push({
        ev: ev,
        col: ev._col,
        totalCols: totalCols
      });
    });
  });

  return evLayouts;
};

/* ========= 拖拽事件 ========= */
LC.bindDragEvent=function(block, ds) {
  var isContextMenuTriggered = false;
  
  block.addEventListener('mousedown', function(e) {
    // 如果是右键，不触发拖拽
    if(e.button === 2) return;
    
    e.preventDefault();
    e.stopPropagation();
    var isTopHandle = e.target.classList.contains('top');
    var isBottomHandle = e.target.classList.contains('bottom');

    LC.dragState = {
      type: isTopHandle ? 'resize-top' : (isBottomHandle ? 'resize-bottom' : 'move'),
      evId: block.dataset.id,
      startY: e.clientY,
      startX: e.clientX,
      origTop: parseInt(block.style.top),
      origHeight: parseInt(block.style.height),
      block: block,
      ds: ds,
      moved: false
    };

    document.addEventListener('mousemove', LC.handleDragMove);
    document.addEventListener('mouseup', LC.handleDragEnd);
  });

  // 非全日日程：右键直接弹出编辑/删除菜单，不弹出信息弹窗
  block.addEventListener('contextmenu', function(e){
    e.preventDefault();
    e.stopPropagation();
    isContextMenuTriggered = true;
    // 延迟重置标志，避免与 mouseup 冲突
    setTimeout(function() { isContextMenuTriggered = false; }, 100);
    var evId = block.dataset.id;
    // 关闭可能存在的 infoPopover
    document.getElementById('infoPopover').style.display = 'none';
    LC.showCtxMenu(e.clientX, e.clientY, evId, ds);
  });
};

LC.handleDragMove=function(e) {
  if(!LC.dragState) return;
  var deltaY = e.clientY - LC.dragState.startY;
  var deltaX = Math.abs(e.clientX - LC.dragState.startX);
  if(Math.abs(deltaY) > 2 || deltaX > 2) LC.dragState.moved = true;

  if(LC.dragState.type === 'move') {
    var newTop = LC.dragState.origTop + deltaY;
    LC.dragState.block.style.top = newTop + 'px';
    LC.dragState.block.style.cursor = 'grabbing';
  } else if(LC.dragState.type === 'resize-top') {
    var newTop = LC.dragState.origTop + deltaY;
    var newHeight = LC.dragState.origHeight - deltaY;
    if(newHeight < 15) return;
    LC.dragState.block.style.top = newTop + 'px';
    LC.dragState.block.style.height = newHeight + 'px';
  } else if(LC.dragState.type === 'resize-bottom') {
    var newHeight = LC.dragState.origHeight + deltaY;
    if(newHeight < 15) return;
    LC.dragState.block.style.height = newHeight + 'px';
  }
};

LC.handleDragEnd=function(e) {
  if(!LC.dragState) return;
  
  // 获取当前事件块对应的日程
  var ev = LC.ud.events.find(function(ev){ return ev.id === LC.dragState.evId; });
  
  // 如果没有移动，且不是右键触发的，当作左键点击，弹出信息弹窗（仅对非全日日程）
  if(!LC.dragState.moved) {
    // 检查是否是右键触发的（右键触发的 dragState 不会有这个回调，但为了安全）
    if(ev && !ev.isAllDay) {
      // 非全日日程：左键点击弹出信息弹窗
      // 确保没有右键菜单正在显示
      var ctxMenu = document.getElementById('ctxMenu');
      if(ctxMenu.style.display !== 'block') {
        LC.showInfoPopover(e.clientX, e.clientY, ev, LC.dragState.ds);
      }
    }
    LC.dragState = null;
    document.removeEventListener('mousemove', LC.handleDragMove);
    document.removeEventListener('mouseup', LC.handleDragEnd);
    return;
  }

  // 有拖拽移动，保存新位置
  if(ev) {
    var deltaY = e.clientY - LC.dragState.startY;
    var deltaMin = Math.round(deltaY);
    
    if(LC.dragState.type === 'move') {
      var duration = LC.dragState.origHeight;
      ev.startMin = LC.clamp(LC.dragState.origTop + deltaMin, 0, 1440 - duration);
      ev.endMin = ev.startMin + duration;
    } else if(LC.dragState.type === 'resize-top') {
      ev.startMin = LC.clamp(LC.dragState.origTop + deltaMin, 0, LC.dragState.origTop + LC.dragState.origHeight - 15);
      ev.endMin = LC.dragState.origTop + LC.dragState.origHeight;
    } else if(LC.dragState.type === 'resize-bottom') {
      ev.endMin = LC.clamp(LC.dragState.origTop + LC.dragState.origHeight + deltaMin, ev.startMin + 15, 1440);
    }

    ev.startTime = String(Math.floor(ev.startMin / 60)).padStart(2,'0') + ':' + String(ev.startMin % 60).padStart(2,'0');
    ev.endTime = String(Math.floor(ev.endMin / 60)).padStart(2,'0') + ':' + String(ev.endMin % 60).padStart(2,'0');

    LC.save();
    var scrollPart = document.getElementById('sidebarScrollPart');
    var prevScroll = scrollPart.scrollTop;
    LC.openSidebar(LC.dragState.ds);
    scrollPart.scrollTop = prevScroll;
  }

  LC.dragState = null;
  document.removeEventListener('mousemove', LC.handleDragMove);
  document.removeEventListener('mouseup', LC.handleDragEnd);
};

/* ========= 右键菜单 ========= */
LC.showCtxMenu=function(x, y, id, ds){
  // 先关闭信息弹窗
  var pop = document.getElementById('infoPopover');
  if(pop) pop.style.display = 'none';
  
  var ctxMenu = document.getElementById('ctxMenu');
  ctxMenu.style.left = x+'px';
  ctxMenu.style.top = y+'px';
  ctxMenu.style.display = 'block';
  LC.ctxEventId = {id: id, ds: ds};
  
  // 移除旧的监听器，避免重复绑定
  var editBtn = document.getElementById('ctxEdit');
  var delBtn = document.getElementById('ctxDel');
  var newEditBtn = editBtn.cloneNode(true);
  var newDelBtn = delBtn.cloneNode(true);
  editBtn.parentNode.replaceChild(newEditBtn, editBtn);
  delBtn.parentNode.replaceChild(newDelBtn, delBtn);
  
  newEditBtn.onclick = function(){
    ctxMenu.style.display='none';
    if(LC.ctxEventId) LC.openModal(LC.ctxEventId.ds, null, LC.ctxEventId.id);
  };
  newDelBtn.onclick = function(){
    ctxMenu.style.display='none';
    if(LC.ctxEventId) LC.showConfirmDel(LC.ctxEventId.id, LC.ctxEventId.ds);
  };
};

/* ========= 确认删除（支持重复日程的两种删除模式） ========= */
LC.showConfirmDel=function(id, ds){
  // 查找要删除的日程
  var ev = LC.ud.events.find(function(e){ return e.id === id; });
  if(!ev) return;
  
  var isRecurring = ev.repeat && ev.repeat !== 'none';
  
  if(isRecurring) {
    // 重复日程：显示三个选项的弹窗，垂直排列，每个按钮单独一行居中
    var confirmOverlay = document.getElementById('confirmOverlay');
    var confirmMsg = document.getElementById('confirmMsg');
    var confirmYes = document.getElementById('confirmYes');
    var confirmNo = document.getElementById('confirmNo');
    
    // 获取按钮行容器
    var btnRow = confirmYes.parentNode;
    
    // 保存原始按钮的类名
    var originalYesClass = confirmYes.className;
    var originalNoClass = confirmNo.className;
    
    // 清空按钮行
    btnRow.innerHTML = '';
    
    // 设置按钮行样式为垂直列布局
    btnRow.style.display = 'flex';
    btnRow.style.flexDirection = 'column';
    btnRow.style.alignItems = 'center';
    btnRow.style.gap = '10px';
    
    // 创建"仅删除此日程"按钮
    var confirmSingle = document.createElement('button');
    confirmSingle.id = 'confirmDeleteSingle';
    confirmSingle.className = 'hand-btn danger-btn';
    confirmSingle.textContent = LC.t('del_single', '仅删除此日程');
    confirmSingle.style.borderColor = '#c06060';
    confirmSingle.style.color = '#c06060';
    confirmSingle.style.minWidth = '160px';
    confirmSingle.style.width = 'auto';
    
    // 创建"删除所有日程"按钮
    var confirmAll = document.createElement('button');
    confirmAll.id = 'confirmYes';
    confirmAll.className = originalYesClass;
    confirmAll.textContent = LC.t('del_all', '删除所有日程');
    confirmAll.style.minWidth = '160px';
    confirmAll.style.width = 'auto';
    
    // 创建"取消"按钮
    var confirmCancel = document.createElement('button');
    confirmCancel.id = 'confirmNo';
    confirmCancel.className = originalNoClass;
    confirmCancel.textContent = LC.t('no', '取消');
    confirmCancel.style.minWidth = '160px';
    confirmCancel.style.width = 'auto';
    
    // 按顺序添加按钮：仅删除此日程 -> 删除所有日程 -> 取消
    btnRow.appendChild(confirmSingle);
    btnRow.appendChild(confirmAll);
    btnRow.appendChild(confirmCancel);
    
    // 设置提示文字
    confirmMsg.textContent = LC.t('confirm_del_recurring', '确定删除此重复日程吗？');
    
    confirmOverlay.classList.add('active');
    
    // 删除所有日程
    confirmAll.onclick = function(){
      LC.ud.events = LC.ud.events.filter(function(e){ return e.id !== id; });
      LC.save();
      confirmOverlay.classList.remove('active');
      // 恢复按钮行原始结构
      LC.restoreConfirmButtons(btnRow);
      var scrollPart = document.getElementById('sidebarScrollPart');
      var prevScroll = scrollPart ? scrollPart.scrollTop : 0;
      LC.openSidebar(ds);
      if(scrollPart) scrollPart.scrollTop = prevScroll;
    };
    
    // 仅删除此日程
    confirmSingle.onclick = function(){
      LC.deleteSingleRecurrence(id, ds);
      confirmOverlay.classList.remove('active');
      // 恢复按钮行原始结构
      LC.restoreConfirmButtons(btnRow);
      var scrollPart = document.getElementById('sidebarScrollPart');
      var prevScroll = scrollPart ? scrollPart.scrollTop : 0;
      LC.openSidebar(ds);
      if(scrollPart) scrollPart.scrollTop = prevScroll;
    };
    
    // 取消
    confirmCancel.onclick = function(){
      confirmOverlay.classList.remove('active');
      // 恢复按钮行原始结构
      LC.restoreConfirmButtons(btnRow);
    };
  } else {
    // 非重复日程：显示普通确认弹窗
    document.getElementById('confirmMsg').textContent = LC.t('confirm_del','Confirm delete?');
    document.getElementById('confirmOverlay').classList.add('active');
    document.getElementById('confirmYes').onclick = function(){
      LC.ud.events = LC.ud.events.filter(function(e){ return e.id !== id; });
      LC.save();
      document.getElementById('confirmOverlay').classList.remove('active');
      var scrollPart = document.getElementById('sidebarScrollPart');
      var prevScroll = scrollPart ? scrollPart.scrollTop : 0;
      LC.openSidebar(ds);
      if(scrollPart) scrollPart.scrollTop = prevScroll;
    };
    document.getElementById('confirmNo').onclick = function(){
      document.getElementById('confirmOverlay').classList.remove('active');
    };
  }
};

/* ========= 恢复确认弹窗按钮原始结构 ========= */
LC.restoreConfirmButtons=function(btnRow){
  // 恢复按钮行样式
  btnRow.style.display = '';
  btnRow.style.flexDirection = '';
  btnRow.style.alignItems = '';
  btnRow.style.gap = '';
  
  // 清空并恢复原始按钮
  btnRow.innerHTML = '';
  var originalYes = document.createElement('button');
  originalYes.id = 'confirmYes';
  originalYes.className = 'hand-btn primary';
  originalYes.textContent = LC.t('yes', '确认');
  var originalNo = document.createElement('button');
  originalNo.id = 'confirmNo';
  originalNo.className = 'hand-btn';
  originalNo.textContent = LC.t('no', '取消');
  btnRow.appendChild(originalYes);
  btnRow.appendChild(originalNo);
};

/* ========= 仅删除单次重复日程 ========= */
LC.deleteSingleRecurrence=function(id, targetDate){
  var ev = LC.ud.events.find(function(e){ return e.id === id; });
  if(!ev) return;
  
  // 初始化例外数组
  if(!ev.exceptions) ev.exceptions = [];
  
  // 将目标日期加入例外列表
  if(ev.exceptions.indexOf(targetDate) === -1) {
    ev.exceptions.push(targetDate);
  }
  
  LC.save();
};

/* ========= 侧边栏关闭 ========= */
document.getElementById('sidebarClose').onclick = function(){ document.getElementById('sidebarOverlay').classList.remove('active'); LC.currentSidebarDate = null; };

/* ========= 侧边栏拖动调整宽度 ========= */
document.getElementById('sidebarDragHandle').addEventListener('mousedown', function(e){
  LC.isResizingSidebar = true;
  LC.sidebarStartX = e.clientX;
  LC.sidebarStartW = document.getElementById('sidebarOverlay').offsetWidth;
  e.preventDefault();
});
addEventListener('mousemove', function(e){
  if(!LC.isResizingSidebar) return;
  var newW = LC.sidebarStartW - (e.clientX - LC.sidebarStartX);
  newW = Math.max(250, Math.min(800, newW));
  document.getElementById('sidebarOverlay').style.width = newW + 'px';
});
addEventListener('mouseup', function(){ LC.isResizingSidebar = false; });