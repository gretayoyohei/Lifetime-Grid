/* ========= 年龄验证 ========= */
LC.validateAge=function(){
  var hint=document.getElementById('ageHint');
  try{
    var y=document.getElementById('inBirthY').value, m=document.getElementById('inBirthM').value, d=document.getElementById('inBirthD').value;
    var life=parseInt(document.getElementById('inLife').value);
    if(!y||!m||!d||isNaN(life)){hint.textContent='';return}
    var birth=y+'-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    var age=LC.calcAge(birth);
    if(life>120)hint.textContent=LC.t('am','Max 120');
    else if(life<=age)hint.textContent=LC.tf('al',{a:age},'Min age '+(age+1));
    else hint.textContent='';
  }catch(e){hint.textContent=''}
};
document.getElementById('inLife').addEventListener('input',LC.validateAge);
document.getElementById('inBirthY').addEventListener('change',LC.validateAge);
document.getElementById('inBirthM').addEventListener('change',LC.validateAge);
document.getElementById('inBirthD').addEventListener('change',LC.validateAge);

/* ========= 动画循环 ========= */
LC.animate=function(){
  var prev=LC.zoom;
  LC.zoom+=(LC.tZoom-LC.zoom)*.13;
  if(LC.targetCx!==undefined) LC.cx+=(LC.targetCx-LC.cx)*.1;
  if(LC.targetCy!==undefined) LC.cy+=(LC.targetCy-LC.cy)*.1;
  if(LC.hasAnch&&Math.abs(LC.zoom-prev)>0.0001){
    LC.cx=LC.anchWX-(LC.anchSX-LC.W/2)/LC.zoom;
    LC.cy=LC.anchWY-(LC.anchSY-LC.H/2)/LC.zoom;
    LC.targetCx=LC.cx; LC.targetCy=LC.cy;
  }
  LC.render();
  requestAnimationFrame(LC.animate);
};

/* ========= 视图控制 ========= */
LC.resetView=function(){LC.tZoom=Math.min(LC.W/(LC.gridW+80),LC.H/(LC.gridH+80))*.9;LC.targetCx=LC.gridW/2;LC.targetCy=LC.gridH/2;LC.hasAnch=false};
LC.zoomToToday=function(){
  var now=new Date(),yi=now.getFullYear()-LC.birthYr;if(yi<0||yi>=LC.totalYrs)return;
  var wp=LC.yrPos(yi),mi=now.getMonth(),mp=LC.moPos(mi);
  var info=LC.monthInfo(now.getFullYear(),mi),day=now.getDate();
  var dow=(info.dow1+day-1)%7,wr=Math.floor((info.dow1+day-1)/7);
  var dp2=LC.dayPos(dow,wr);
  LC.targetCx=wp.x+mp.x+dp2.x+LC.DW/2;LC.targetCy=wp.y+mp.y+dp2.y+LC.DH/2;LC.tZoom=22;LC.hasAnch=false;
};
LC.zoomToThisYear=function(){
  var now = new Date(), yi = now.getFullYear() - LC.birthYr;
  if(yi<0||yi>=LC.totalYrs) return;
  var wp = LC.yrPos(yi);
  LC.targetCx = wp.x + LC.YW/2;
  LC.targetCy = wp.y + LC.YH/2;
  LC.tZoom = Math.min(LC.W/(LC.YW+40), LC.H/(LC.YH+40));
  LC.hasAnch = false;
};
LC.zoomToThisMonth=function(){
  var now = new Date(), yi = now.getFullYear() - LC.birthYr, mi = now.getMonth();
  if(yi<0||yi>=LC.totalYrs) return;
  var wp = LC.yrPos(yi), mp = LC.moPos(mi);
  LC.targetCx = wp.x + mp.x + LC.MW/2;
  LC.targetCy = wp.y + mp.y + LC.MH/2;
  LC.tZoom = Math.min(LC.W/(LC.MW+20), LC.H/(LC.MH+20));
  LC.hasAnch = false;
};

/* ========= 启动按钮（使用自定义弹窗，支持多语言） ========= */
document.getElementById('btnGo').onclick=function(){
  var name=document.getElementById('inName').value.trim();
  var y=document.getElementById('inBirthY').value, m=document.getElementById('inBirthM').value, d=document.getElementById('inBirthD').value;
  var life=parseInt(document.getElementById('inLife').value);
  var hint=document.getElementById('ageHint');
  if(!name||!y||!m||!d||isNaN(life)){hint.textContent=LC.t('fa','Please fill all fields');return}
  var birth=y+'-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0');
  if(life>120){hint.textContent=LC.t('am','Max 120');return}
  var age=LC.calcAge(birth);
  if(life<=age){hint.textContent=LC.tf('al',{a:age},'Age must be > '+age);return}
  var bd=new Date(birth+'T00:00:00');if(bd>new Date()){hint.textContent=LC.t('bf','Invalid date');return}
  
  // 检测寿命是否被改小
  var oldLifeExp = LC.ud ? LC.ud.lifeExp : null;
  var oldBirthDate = LC.ud ? LC.ud.birthDate : null;
  
  if(oldLifeExp !== null && oldBirthDate === birth && life < oldLifeExp) {
    var birthYear = new Date(birth+'T00:00:00').getFullYear();
    var oldEndYear = birthYear + oldLifeExp - 1;
    var newEndYear = birthYear + life - 1;
    
    if(newEndYear < oldEndYear) {
      var firstHiddenYear = newEndYear + 1;
      
      // 使用自定义弹窗
      var confirmOverlay = document.getElementById('confirmOverlay');
      var confirmMsg = document.getElementById('confirmMsg');
      var btnRow = document.getElementById('confirmYes').parentNode;
      
      // 保存原始按钮的类名
      var originalYesClass = document.getElementById('confirmYes').className;
      var originalNoClass = document.getElementById('confirmNo').className;
      
      // 清空并重新设置按钮行
      btnRow.innerHTML = '';
      btnRow.style.display = 'flex';
      btnRow.style.flexDirection = 'row';
      btnRow.style.gap = '12px';
      btnRow.style.justifyContent = 'center';
      
      // 创建确定按钮
      var confirmYesBtn = document.createElement('button');
      confirmYesBtn.id = 'confirmYes';
      confirmYesBtn.className = originalYesClass;
      confirmYesBtn.textContent = LC.t('yes', '确定');
      
      // 创建取消按钮
      var confirmNoBtn = document.createElement('button');
      confirmNoBtn.id = 'confirmNo';
      confirmNoBtn.className = originalNoClass;
      confirmNoBtn.textContent = LC.t('no', '取消');
      
      btnRow.appendChild(confirmYesBtn);
      btnRow.appendChild(confirmNoBtn);
      
      // 使用国际化系统显示警告信息
      confirmMsg.textContent = LC.tf('lifeWarnShort', {
        old: oldLifeExp,
        new: life,
        year: firstHiddenYear
      });
      
      confirmOverlay.classList.add('active');
      
      // 确定按钮逻辑
      confirmYesBtn.onclick = function() {
        confirmOverlay.classList.remove('active');
        // 恢复按钮行
        if(typeof LC.restoreConfirmButtons === 'function') {
          LC.restoreConfirmButtons(btnRow);
        }
        // 保存新数据并进入日历
        var oldEv = (LC.ud && LC.ud.birthDate===birth) ? (LC.ud.events||[]) : [];
        LC.ud={name:name,birthDate:birth,lifeExp:life,events:oldEv};
        LC.originalLifeExp = life;
        LC.save();
        LC.enterCalendar();
      };
      
      // 取消按钮逻辑
      confirmNoBtn.onclick = function() {
        confirmOverlay.classList.remove('active');
        if(typeof LC.restoreConfirmButtons === 'function') {
          LC.restoreConfirmButtons(btnRow);
        }
        // 恢复输入框的值
        document.getElementById('inLife').value = oldLifeExp;
        LC.validateAge();
      };
      
      return;
    }
  }
  
  // 没有警告，直接进入
  var oldEv = (LC.ud && LC.ud.birthDate===birth) ? (LC.ud.events||[]) : [];
  LC.ud={name:name,birthDate:birth,lifeExp:life,events:oldEv};
  LC.originalLifeExp = life;
  LC.save();
  LC.enterCalendar();
};

document.getElementById('btnReset').onclick=function(){LC.resetView(); document.getElementById('sidebarOverlay').classList.remove('active'); LC.currentSidebarDate=null;};
document.getElementById('btnThisYear').onclick=function(){LC.zoomToThisYear(); document.getElementById('sidebarOverlay').classList.remove('active'); LC.currentSidebarDate=null;};
document.getElementById('btnThisMonth').onclick=function(){LC.zoomToThisMonth(); document.getElementById('sidebarOverlay').classList.remove('active'); LC.currentSidebarDate=null;};
document.getElementById('btnToday').onclick=function(){LC.zoomToToday(); document.getElementById('sidebarOverlay').classList.remove('active'); LC.currentSidebarDate=null;};
document.getElementById('btnOut').onclick=function(){
  document.getElementById('controls').classList.remove('active');
  document.getElementById('zoomSliderContainer').classList.remove('active');
  document.getElementById('inputPage').classList.remove('hidden');
  document.getElementById('sidebarOverlay').classList.remove('active');
  LC.currentSidebarDate = null;
  LC.showBgAnim=true;
};

/* ========= 进入日历 ========= */
LC.enterCalendar=function(){
  LC.birthYr=new Date(LC.ud.birthDate+'T00:00:00').getFullYear();
  LC.totalYrs=LC.ud.lifeExp;
  LC.gridW=LC.YPR*(LC.YW+LC.YGAP)-LC.YGAP;LC.gridH=Math.ceil(LC.totalYrs/LC.YPR)*(LC.YH+LC.YGAP)-LC.YGAP;
  document.getElementById('inputPage').classList.add('hidden');LC.showBgAnim=false;
  document.getElementById('controls').classList.add('active');
  document.getElementById('zoomSliderContainer').classList.add('active');
  document.getElementById('zoomHint').classList.remove('hidden');
  document.getElementById('zoomHint').textContent=LC.t('zh','Scroll to zoom');
  setTimeout(function(){document.getElementById('zoomHint').classList.add('hidden')},4500);
  LC.zoom=Math.min(LC.W/(LC.gridW+80),LC.H/(LC.gridH+80))*.85;LC.tZoom=LC.zoom;
  LC.cx=LC.gridW/2;LC.cy=LC.gridH/2;LC.targetCx=LC.cx;LC.targetCy=LC.cy;
};

/* ========= 初始化 ========= */
function init(){
  LC.buildLangSel();
  document.body.classList.toggle('rtl',LC.curLang==='ar');
  LC.populateBirthSelects();
  requestAnimationFrame(LC.animBg);
  if(LC.load()){
    if(LC.ud.events && LC.ud.events.length){
      LC.ud.events.forEach(function(e){
        if(!e.id) e.id = LC.genId();
        if(!e.startDate && e.date) {
          e.startDate = e.date;
          e.endDate = e.date;
          delete e.date;
        }
        if(!e.type) e.type = 'p';
        if(e.isAllDay === undefined) e.isAllDay = false;
        if(!e.repeat) e.repeat = 'none';
        if(!e.startTime && e.start) {
          var parts = e.start.split('T');
          e.startTime = parts[1] ? parts[1].substring(0,5) : '09:00';
        } else if(!e.startTime) {
          e.startTime = '09:00';
        }
        if(!e.endTime && e.end) {
          var parts = e.end.split('T');
          e.endTime = parts[1] ? parts[1].substring(0,5) : '10:00';
        } else if(!e.endTime) {
          e.endTime = '10:00';
        }
        delete e.start; delete e.end; delete e.time;
      });
      LC.save();
    }
    // 加载后保存原始寿命值
    if(LC.ud && LC.ud.lifeExp) {
      LC.originalLifeExp = LC.ud.lifeExp;
    }
    LC.enterCalendar();
  }else{
    document.getElementById('inputPage').classList.remove('hidden');
  }
  LC.refreshText();LC.animate();
}
init();

/* ========= 工具箱按钮交互（支持多语言） ========= */
(function initToolbox() {
  var toolboxBtn = document.getElementById('toolboxBtn');
  var toolboxMenu = document.getElementById('toolboxMenu');
  var toolboxExport = document.getElementById('toolboxExport');
  var toolboxImport = document.getElementById('toolboxImport');
  var toolboxLogout = document.getElementById('toolboxLogout');
  
  // 更新工具箱菜单文本（支持多语言）
  function updateToolboxText() {
    if (toolboxBtn) toolboxBtn.title = LC.t('toolbox_title', '工具箱');
    if (toolboxExport) {
      var exportLabel = toolboxExport.querySelector('.toolbox-label');
      if (exportLabel) exportLabel.textContent = LC.t('toolbox_export', '导出日程');
    }
    if (toolboxImport) {
      var importLabel = toolboxImport.querySelector('.toolbox-label');
      if (importLabel) importLabel.textContent = LC.t('toolbox_import', '导入日程');
    }
    if (toolboxLogout) {
      var logoutLabel = toolboxLogout.querySelector('.toolbox-label');
      if (logoutLabel) logoutLabel.textContent = LC.t('toolbox_logout', '登出');
    }
  }
  
  // 菜单展开/收起
  function toggleMenu(e) {
    e.stopPropagation();
    toolboxMenu.classList.toggle('active');
  }
  
  function closeMenu() {
    toolboxMenu.classList.remove('active');
  }
  
  if (toolboxBtn) {
    toolboxBtn.addEventListener('click', toggleMenu);
  }
  
  // 点击页面其他地方关闭菜单
  document.addEventListener('click', function(e) {
    var container = document.getElementById('toolboxContainer');
    if (container && !container.contains(e.target)) {
      closeMenu();
    }
  });
  
  // 导出日程的 Tooltip
  var exportTooltip = null;
  var exportTimeout = null;
  
  function getExportTooltipText() {
    return LC.t('tooltip_export', '🔒 为保护隐私，日程只存在您浏览器中。换设备或清缓存会丢失，建议定期导出日程备份。');
  }
  
  function showExportTooltip(target) {
    if (exportTooltip) {
      exportTooltip.remove();
      exportTooltip = null;
    }
    if (exportTimeout) clearTimeout(exportTimeout);
    
    exportTooltip = document.createElement('div');
    exportTooltip.className = 'tooltip';
    exportTooltip.textContent = getExportTooltipText();
    document.body.appendChild(exportTooltip);
    
    var rect = target.getBoundingClientRect();
    var left = rect.left;
    var top = rect.top - exportTooltip.offsetHeight - 8;
    
    if (top < 8) top = rect.bottom + 8;
    if (left + exportTooltip.offsetWidth > window.innerWidth - 8) {
      left = window.innerWidth - exportTooltip.offsetWidth - 8;
    }
    if (left < 8) left = 8;
    
    exportTooltip.style.left = left + 'px';
    exportTooltip.style.top = top + 'px';
    exportTooltip.classList.add('visible');
    
    exportTimeout = setTimeout(function() {
      if (exportTooltip) {
        exportTooltip.classList.remove('visible');
        setTimeout(function() {
          if (exportTooltip && exportTooltip.parentNode) exportTooltip.remove();
          exportTooltip = null;
        }, 200);
      }
    }, 4000);
  }
  
  function hideExportTooltip() {
    if (exportTimeout) clearTimeout(exportTimeout);
    if (exportTooltip) {
      exportTooltip.classList.remove('visible');
      setTimeout(function() {
        if (exportTooltip && exportTooltip.parentNode) exportTooltip.remove();
        exportTooltip = null;
      }, 200);
    }
  }
  
  // 导出日程功能
  if (toolboxExport) {
    toolboxExport.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu();
      if(!LC.ud) return;
      var dataStr = JSON.stringify(LC.ud, null, 2);
      var blob = new Blob([dataStr], {type: 'application/json'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'life_calendar_backup.json';
      a.click();
      URL.revokeObjectURL(url);
    });
    
    toolboxExport.addEventListener('mouseenter', function(e) {
      showExportTooltip(e.target.closest('.toolbox-item'));
    });
    toolboxExport.addEventListener('mouseleave', hideExportTooltip);
  }
  
  // 导入日程确认弹窗（支持多语言）
  var importConfirmOverlay = null;
  
  function createImportConfirmDialog() {
    var oldOverlay = document.getElementById('importConfirmOverlay');
    if (oldOverlay) oldOverlay.remove();
    
    var overlay = document.createElement('div');
    overlay.id = 'importConfirmOverlay';
    overlay.innerHTML = `
      <div class="import-confirm-box">
        <div class="warning-title">${LC.t('import_warning_title', '⚠️ 导入将覆盖现有日程')}</div>
        <p>${LC.t('import_warning_text', '导入的日程文档将完全替换您当前的所有日程数据，此操作不可撤销。')}</p>
        <p style="font-size:0.85rem; color:#8b7d6b;">${LC.t('import_suggestion', '建议在导入前先「导出日程」备份现有数据。')}</p>
        <div class="btn-row">
          <button class="hand-btn" id="importCancelBtn">${LC.t('import_cancel', '取消')}</button>
          <button class="hand-btn primary" id="importConfirmBtn">${LC.t('import_confirm', '确认导入')}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }
  
  function refreshImportDialog() {
    if (importConfirmOverlay && importConfirmOverlay.classList.contains('active')) {
      var oldOverlay = importConfirmOverlay;
      var wasActive = oldOverlay.classList.contains('active');
      oldOverlay.remove();
      importConfirmOverlay = createImportConfirmDialog();
      if (wasActive) {
        importConfirmOverlay.classList.add('active');
        rebindImportButtons();
      }
    }
  }
  
  function rebindImportButtons() {
    var cancelBtn = document.getElementById('importCancelBtn');
    var confirmBtn = document.getElementById('importConfirmBtn');
    
    if (cancelBtn) {
      cancelBtn.onclick = function() {
        if (importConfirmOverlay) importConfirmOverlay.classList.remove('active');
      };
    }
    
    if (confirmBtn) {
      confirmBtn.onclick = function() {
        if (importConfirmOverlay) importConfirmOverlay.classList.remove('active');
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = function(e) {
          var file = e.target.files[0];
          if(!file) return;
          var reader = new FileReader();
          reader.onload = function(evt) {
            try {
              var imported = JSON.parse(evt.target.result);
              if(imported && imported.birthDate && imported.lifeExp !== undefined) {
                LC.ud = imported;
                if(!LC.ud.events) LC.ud.events = [];
                LC.save();
                LC.originalLifeExp = LC.ud.lifeExp;
                alert(LC.t('import_success', '导入成功！页面将刷新'));
                location.reload();
              } else {
                alert(LC.t('import_format_error', '文件格式不正确，请选择正确的人生日历备份文件'));
              }
            } catch(err) {
              alert(LC.t('import_parse_error', '解析失败：') + err.message);
            }
          };
          reader.readAsText(file);
        };
        input.click();
      };
    }
    
    if (importConfirmOverlay) {
      importConfirmOverlay.onclick = function(e) {
        if(e.target === importConfirmOverlay) {
          importConfirmOverlay.classList.remove('active');
        }
      };
    }
  }
  
  function showImportConfirmDialog() {
    importConfirmOverlay = createImportConfirmDialog();
    importConfirmOverlay.classList.add('active');
    rebindImportButtons();
  }
  
  if (toolboxImport) {
    toolboxImport.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu();
      showImportConfirmDialog();
    });
  }
  
  // 登出
  if (toolboxLogout) {
    toolboxLogout.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu();
      document.getElementById('controls').classList.remove('active');
      document.getElementById('zoomSliderContainer').classList.remove('active');
      document.getElementById('inputPage').classList.remove('hidden');
      document.getElementById('sidebarOverlay').classList.remove('active');
      LC.currentSidebarDate = null;
      LC.showBgAnim = true;
    });
  }
  
  // 初始化文本
  updateToolboxText();
  
  // 监听语言切换，更新工具箱文本和导入弹窗
  var originalRefreshText = LC.refreshText;
  LC.refreshText = function() {
    if (originalRefreshText) originalRefreshText();
    updateToolboxText();
    refreshImportDialog();
  };
})();