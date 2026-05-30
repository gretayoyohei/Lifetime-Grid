/* ========= 安全获取翻译文本 ========= */
LC.D={};
LC.defLang=function(code,obj){LC.D[code]=obj};
LC.t=function(k,fallback){try{var v=LC.D[LC.curLang][k];if(v!==undefined)return v}catch(e){}return fallback||k};
LC.tf=function(k,vals,fallback){var s=LC.t(k,fallback);if(!vals)return s;for(var p in vals){var re=new RegExp('\\{'+p+'\\}','g');s=s.replace(re,vals[p]);}return s};

LC.defLang('zh-CN',{
nm:'中文（简体）',ct:'定制我的人生日历',cs:'填写信息，用滚轮缩放穿越你的一生',ln:'我的名字',lb:'我的出生日期',ll:'我希望我能活到',uy:'岁',bg:'✦ 开启人生之旅 ✦',
am:'亲爱的，预计年龄不能超过120岁哦💗',al:'亲爱的💗，别调皮~你已经{a}了哦。请填写比你实际年龄大的岁数。',zh:'滚动鼠标滚轮 · 深入你的生命',ov:'全局',bt:'今天',ex:'登出',ty:'今年',tm:'本月',
vl:'生命全貌',vm:'月视图',vd:'日视图',et:'新建日程',em:'时间',ed:'描述(可选)',sv:'保存',cn:'取消',dl:'删除',ne:'暂无日程',fa:'请填写所有必填项',bf:'出生日期不能是未来',
mo:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],wd:['日','一','二','三','四','五','六'],
tp:{w:'工作',p:'个人',h:'健康',s:'学习',i:'重要事项',a:'纪念日',b:'生日',o:'其他'},ml:'{y} {m}',ym:'{y}年{m}',
ph_name:'你的名字', ph_smart:'试着输入"明晚7点聚餐"',allday:'全天', start:'开始', end:'结束', repeat:'重复', location:'地点', notes:'备注',
rp_n:'一次性日程', rp_d:'每天', rp_w:'每周', rp_m:'每月', rp_y:'每年',sb:'日程详情', sbt:'全天日程', sbh:'{h}:00',
yr:'年', mn:'月', dy:'日', confirm_del:'删除后无法恢复，确认删除该日程吗？', yes:'确认', no:'取消', edit:'编辑日程', del:'删除日程',
confirm_del_recurring:'确定删除此重复日程吗？', del_all:'删除所有日程', del_single:'仅删除此日程',
lifeWarn:'⚠️ {y}年及之后的日程将不再显示，但这些日程不会丢失。改回{oldEnd}岁后可重新查看。',
lifeWarnShort:'将寿命从 {old} 岁改为 {new} 岁后，\n\n{year} 年及之后的日程将不再显示。\n\n改回 {old} 岁即可恢复。\n\n确定继续吗？',
toolbox_title:'工具箱',
toolbox_export:'导出日程',
toolbox_import:'导入日程',
toolbox_logout:'登出',
tooltip_export:'🔒 为保护隐私，日程只存在您浏览器中。换设备或清缓存会丢失，建议定期导出日程备份。',
import_warning_title:'⚠️ 导入将覆盖现有日程',
import_warning_text:'导入的日程文档将完全替换您当前的所有日程数据，此操作不可撤销。',
import_suggestion:'建议在导入前先「导出日程」备份现有数据。',
import_confirm:'确认导入',
import_cancel:'取消',
import_success:'导入成功！页面将刷新',
import_format_error:'文件格式不正确，请选择正确的人生日历备份文件',
import_parse_error:'解析失败：',
todo_title:'待办日程',
todo_empty:'暂无待办日程'
});
LC.defLang('en',{
nm:'English',ct:'Customize My Life Calendar',cs:'Fill in your info, zoom to travel through your life',ln:'My Name',lb:'My Birth Date',ll:'I hope I can live to',
uy:'years old',bg:'✦ Start My Life Journey ✦',am:'Dear, expected age cannot exceed 120 💗',al:'Dear 💗, stop teasing~ You are already {a}. Please enter an age greater than your actual age.',
zh:'Scroll to zoom · Dive into your life',ov:'Overview',bt:'Today',ex:'Log out',ty:'This Year',tm:'This Month',vl:'Life Overview',vm:'Month View',vd:'Day View',
et:'New Event',em:'Time',ed:'Description (optional)',sv:'Save',cn:'Cancel',dl:'Delete',ne:'No events',fa:'Please fill in all required fields',bf:'Birth date cannot be in the future',
mo:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],wd:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
tp:{w:'Work',p:'Personal',h:'Health',s:'Study',i:'Important',a:'Anniversary',b:'Birthday',o:'Other'},ml:'{m} {y}',ym:'{m} {y}',
ph_name:'Your name', ph_smart:'Try typing "Dinner at 7pm tomorrow"',allday:'All Day', start:'Start', end:'End', repeat:'Repeat', location:'Location', notes:'Notes',
rp_n:'Once', rp_d:'Daily', rp_w:'Weekly', rp_m:'Monthly', rp_y:'Yearly',sb:'Schedule Details', sbt:'All Day Events', sbh:'{h}:00',
yr:'Year', mn:'Month', dy:'Day', confirm_del:'Cannot recover after deletion. Confirm delete?', yes:'Confirm', no:'Cancel', edit:'Edit Event', del:'Delete Event',
confirm_del_recurring:'Delete this recurring event?', del_all:'Delete all events', del_single:'Delete only this one',
lifeWarn:'⚠️ Events from year {y} and beyond will not be shown, but not lost. Change back to {oldEnd} years old to see them again.',
lifeWarnShort:'After changing life expectancy from {old} to {new},\n\nevents from year {year} and beyond will not be shown.\n\nChange back to {old} years old to restore them.\n\nAre you sure you want to continue?',
toolbox_title:'Toolbox',
toolbox_export:'Export Events',
toolbox_import:'Import Events',
toolbox_logout:'Logout',
tooltip_export:'🔒 For privacy, events are stored only in your browser. Clearing cache or changing devices will lose them. Export regularly to back up.',
import_warning_title:'⚠️ Import Will Override Existing Events',
import_warning_text:'Imported event file will completely replace all your current events. This action is irreversible.',
import_suggestion:'It is recommended to export current events as backup before importing.',
import_confirm:'Confirm Import',
import_cancel:'Cancel',
import_success:'Import successful! Page will refresh.',
import_format_error:'Invalid file format. Please select a valid life calendar backup file.',
import_parse_error:'Parse failed: ',
todo_title:'To-Do List',
todo_empty:'No pending tasks'
});
LC.defLang('zh-TW',{
nm:'中文（繁體）',ct:'定製我的人生日曆',cs:'填寫資訊，用滾輪縮放穿越你的一生',ln:'我的名字',lb:'我的出生日期',ll:'我希望我能活到',
uy:'歲',bg:'✦ 開啟人生之旅 ✦',am:'親愛的，預計年齡不能超過120歲哦💗',al:'親愛的💗，別調皮~你已經{a}了哦。請填寫比你實際年齡大的歲數。',zh:'滾動滑鼠滾輪 · 深入你的生命',
ov:'全局',bt:'今天',ex:'登出',ty:'今年',tm:'本月',vl:'生命全貌',vm:'月檢視',vd:'日檢視',et:'新建日程',em:'時間',ed:'描述(選填)',sv:'儲存',cn:'取消',dl:'刪除',ne:'暫無日程',
fa:'請填寫所有必填項',bf:'出生日期不能是未來',mo:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],wd:['日','一','二','三','四','五','六'],
tp:{w:'工作',p:'個人',h:'健康',s:'學習',i:'重要事項',a:'紀念日',b:'生日',o:'其他'},ml:'{y} {m}',ym:'{y}年{m}',
ph_name:'你的名字', ph_smart:'試著輸入"明晚7點聚餐"',allday:'全天', start:'開始', end:'結束', repeat:'重複', location:'地點', notes:'備註',
rp_n:'一次性日程', rp_d:'每天', rp_w:'每週', rp_m:'每月', rp_y:'每年',sb:'日程詳情', sbt:'全天日程', sbh:'{h}:00',
yr:'年', mn:'月', dy:'日', confirm_del:'刪除後無法恢復，確認刪除該日程嗎？', yes:'確認', no:'取消', edit:'編輯日程', del:'刪除日程',
confirm_del_recurring:'確定刪除此重複日程嗎？', del_all:'刪除所有日程', del_single:'僅刪除此日程',
lifeWarn:'⚠️ {y}年及之後的日程將不再顯示，但這些日程不會丟失。改回{oldEnd}歲後可重新查看。',
lifeWarnShort:'將壽命從 {old} 歲改為 {new} 歲後，\n\n{year} 年及之後的日程將不再顯示。\n\n改回 {old} 歲即可恢復。\n\n確定繼續嗎？',
toolbox_title:'工具箱',
toolbox_export:'匯出日程',
toolbox_import:'匯入日程',
toolbox_logout:'登出',
tooltip_export:'🔒 為保護隱私，日程只存在您瀏覽器中。換設備或清緩存會丟失，建議定期匯出日程備份。',
import_warning_title:'⚠️ 匯入將覆蓋現有日程',
import_warning_text:'匯入的日程文件將完全替換您當前的所有日程數據，此操作不可撤銷。',
import_suggestion:'建議在匯入前先「匯出日程」備份現有數據。',
import_confirm:'確認匯入',
import_cancel:'取消',
import_success:'匯入成功！頁面將刷新',
import_format_error:'文件格式不正確，請選擇正確的人生日曆備份文件',
import_parse_error:'解析失敗：',
todo_title:'待辦日程',
todo_empty:'暫無待辦日程'
});
LC.defLang('es',{
nm:'Español',ct:'Personaliza Mi Calendario de Vida',cs:'Completa tus datos, haz zoom para recorrer tu vida',ln:'Mi nombre',lb:'Mi fecha de nacimiento',ll:'Espero poder vivir hasta',
uy:'años',bg:'✦ Iniciar Mi Viaje de Vida ✦',am:'Querido, la edad esperada no puede superar 120 💗',al:'Querido 💗, no seas travieso~ Ya tienes {a}. Por favor ingresa una edad mayor.',
zh:'Desplaza para zoom · Sumérgete en tu vida',ov:'Vista general',bt:'Hoy',ex:'Cerrar sesión',ty:'Este Año',tm:'Este Mes',vl:'Vista de vida',vm:'Vista mensual',vd:'Vista diaria',
et:'Nuevo Evento',em:'Hora',ed:'Descripción (opcional)',sv:'Guardar',cn:'Cancelar',dl:'Eliminar',ne:'Sin eventos',fa:'Por favor completa todos los campos',bf:'La fecha de nacimiento no puede ser futura',
mo:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],wd:['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
tp:{w:'Trabajo',p:'Personal',h:'Salud',s:'Estudio',i:'Importante',a:'Aniversario',b:'Cumpleaños',o:'Otro'},ml:'{m} {y}',ym:'{m} {y}',
ph_name:'Tu nombre', ph_smart:'Intenta escribir "Cena a las 7pm mañana"',allday:'Todo el día', start:'Inicio', end:'Fin', repeat:'Repetir', location:'Lugar', notes:'Notas',
rp_n:'Una vez', rp_d:'Diario', rp_w:'Semanal', rp_m:'Mensual', rp_y:'Anual',sb:'Detalles', sbt:'Eventos de todo el día', sbh:'{h}:00',
yr:'Año', mn:'Mes', dy:'Día', confirm_del:'No se puede recuperar después de eliminar. ¿Confirmar eliminación?', yes:'Confirmar', no:'Cancelar', edit:'Editar evento', del:'Eliminar evento',
confirm_del_recurring:'¿Eliminar este evento recurrente?', del_all:'Eliminar todos', del_single:'Eliminar solo este',
lifeWarn:'⚠️ Los eventos desde el año {y} en adelante no se mostrarán, pero no se perderán. Vuelva a {oldEnd} años para verlos.',
lifeWarnShort:'Después de cambiar la esperanza de vida de {old} a {new},\n\nlos eventos desde el año {year} en adelante no se mostrarán.\n\nVuelva a {old} años para restaurarlos.\n\n¿Estás seguro de que quieres continuar?',
toolbox_title:'Caja de Herramientas',
toolbox_export:'Exportar Eventos',
toolbox_import:'Importar Eventos',
toolbox_logout:'Cerrar Sesión',
tooltip_export:'🔒 Por privacidad, los eventos se guardan solo en tu navegador. Cambiar de dispositivo o borrar caché los perderá. Exporta regularmente como respaldo.',
import_warning_title:'⚠️ La importación sobrescribirá los eventos existentes',
import_warning_text:'El archivo importado reemplazará completamente todos tus eventos actuales. Esta acción es irreversible.',
import_suggestion:'Se recomienda exportar los eventos actuales como respaldo antes de importar.',
import_confirm:'Confirmar Importación',
import_cancel:'Cancelar',
import_success:'¡Importación exitosa! La página se actualizará',
import_format_error:'Formato de archivo inválido. Selecciona un archivo de respaldo válido.',
import_parse_error:'Error de análisis: ',
todo_title:'Lista de tareas',
todo_empty:'No hay tareas pendientes'
});
LC.defLang('ja',{
nm:'日本語',ct:'人生カレンダーをカスタマイズ',cs:'情報を入力して、ズームで人生を旅しよう',ln:'私の名前',lb:'生年月日',ll:'生きたい年齢は',
uy:'歳',bg:'✦ 人生の旅を始める ✦',am:'予想年齢は120歳を超えられません 💗',al:'ふざけないで〜あなたはもう{a}ですよ。実際の年齢より大きい年齢を入力してください 💗',
zh:'スクロールでズーム · 人生を深く見る',ov:'全体表示',bt:'今日',ex:'ログアウト',ty:'今年',tm:'今月',
vl:'人生概要',vm:'月表示',vd:'日表示',
et:'新しいイベント',em:'時間',ed:'説明（任意）',sv:'保存',cn:'キャンセル',dl:'削除',ne:'予定なし',fa:'すべての項目を入力してください',bf:'生年月日は未来の日付は不可',
mo:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],wd:['日','月','火','水','木','金','土'],
tp:{w:'仕事',p:'個人',h:'健康',s:'学習',i:'重要',a:'記念日',b:'誕生日',o:'その他'},ml:'{y}{m}',ym:'{y}年{m}',
ph_name:'あなたの名前', ph_smart:'「明日の午後7時に夕食」と入力してみてください',allday:'終日', start:'開始', end:'終了', repeat:'繰り返し', location:'場所', notes:'メモ',
rp_n:'一度きり', rp_d:'毎日', rp_w:'毎週', rp_m:'毎月', rp_y:'毎年',sb:'スケジュール詳細', sbt:'終日の予定', sbh:'{h}:00',
yr:'年', mn:'月', dy:'日', confirm_del:'削除後は復元できません。削除しますか？', yes:'確認', no:'キャンセル', edit:'予定を編集', del:'予定を削除',
confirm_del_recurring:'この繰り返し予定を削除しますか？', del_all:'すべて削除', del_single:'これのみ削除',
lifeWarn:'⚠️ {y}年以降の予定は表示されなくなりますが、失われません。{oldEnd}歳に戻すと再表示されます。',
lifeWarnShort:'寿命を {old} 歳から {new} 歳に変更すると、\n\n{year} 年以降の予定は表示されなくなります。\n\n{old} 歳に戻せば復元されます。\n\n続行しますか？',
toolbox_title:'ツールボックス',
toolbox_export:'予定をエクスポート',
toolbox_import:'予定をインポート',
toolbox_logout:'ログアウト',
tooltip_export:'🔒 プライバシー保護のため、予定はブラウザにのみ保存されます。デバイス変更やキャッシュクリアで失われます。定期的にバックアップをエクスポートしてください。',
import_warning_title:'⚠️ インポートは既存の予定を上書きします',
import_warning_text:'インポートした予定ファイルは、現在のすべての予定データを完全に置き換えます。この操作は元に戻せません。',
import_suggestion:'インポートする前に、現在のデータを「エクスポート」してバックアップすることをお勧めします。',
import_confirm:'インポートを確認',
import_cancel:'キャンセル',
import_success:'インポート成功！ページを更新します',
import_format_error:'ファイル形式が正しくありません。正しい人生カレンダーのバックアップファイルを選択してください。',
import_parse_error:'解析失敗：',
todo_title:'やることリスト',
todo_empty:'予定はありません'
});
LC.defLang('ko',{
nm:'한국어',ct:'인생 달력 만들기',cs:'정보를 입력하고 줌으로 인생을 여행하세요',ln:'내 이름',lb:'생년월일',ll:'살고 싶은 나이는',
uy:'세',bg:'✦ 인생 여행 시작 ✦',am:'친애하는, 예상 나이는 120세를 초과할 수 없어요 💗',al:'친애하는 💗, 장난치지 마~ 당신은 이미 {a}이에요. 실제 나이보다 큰 나이를 입력해주세요.',
zh:'스크롤로 줌 · 인생에 깊이 빠져보세요',ov:'전체보기',bt:'오늘',ex:'로그아웃',ty:'올해',tm:'이번 달',vl:'인생 개요',vm:'월별 보기',vd:'일별 보기',
et:'새 이벤트',em:'시간',ed:'설명 (선택)',sv:'저장',cn:'취소',dl:'삭제',ne:'일정 없음',fa:'모든 필드를 입력해주세요',bf:'생년월일은 미래일 수 없습니다',
mo:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],wd:['일','월','화','수','목','금','토'],
tp:{w:'업무',p:'개인',h:'건강',s:'학습',i:'중요',a:'기념일',b:'생일',o:'기타'},ml:'{y} {m}',ym:'{y}년 {m}',
ph_name:'당신의 이름',ph_smart:'내일 저녁 7시 저녁 식사"라고 입력해 보세요',allday:'종일',start:'시작',end:'종료',repeat:'반복',location:'장소',notes:'메모',
rp_n:'일회성',rp_d:'매일',rp_w:'매주',rp_m:'매월',rp_y:'매년',sb:'일정 상세',sbt:'종일 일정',sbh:'{h}:00',
yr:'년', mn:'월', dy:'일', confirm_del:'삭제 후 복구할 수 없습니다. 삭제를 확인하시겠습니까?',yes:'확인',no:'취소',edit:'일정 수정',del:'일정 삭제',
confirm_del_recurring:'이 반복 일정을 삭제하시겠습니까?', del_all:'모든 일정 삭제', del_single:'이 일정만 삭제',
lifeWarn:'⚠️ {y}년 이후의 일정은 표시되지 않지만 손실되지 않습니다. {oldEnd}세로 되돌리면 다시 볼 수 있습니다.',
lifeWarnShort:'수명을 {old}세에서 {new}세로 변경하면\n\n{year}년 이후의 일정이 표시되지 않습니다.\n\n{old}세로 되돌리면 복원됩니다.\n\n계속하시겠습니까？',
toolbox_title:'도구 상자',
toolbox_export:'일정 내보내기',
toolbox_import:'일정 가져오기',
toolbox_logout:'로그아웃',
tooltip_export:'🔒 개인정보 보호를 위해 일정은 브라우저에만 저장됩니다. 기기 변경이나 캐시 삭제 시 손실됩니다. 정기적으로 백업을 내보내세요.',
import_warning_title:'⚠️ 가져오기는 기존 일정을 덮어씁니다',
import_warning_text:'가져온 일정 파일이 현재 모든 일정 데이터를 완전히 대체합니다. 이 작업은 취소할 수 없습니다.',
import_suggestion:'가져오기 전에 현재 데이터를 "내보내기"로 백업하는 것이 좋습니다.',
import_confirm:'가져오기 확인',
import_cancel:'취소',
import_success:'가져오기 성공! 페이지를 새로고침합니다',
import_format_error:'파일 형식이 올바르지 않습니다. 올바른 인생 달력 백업 파일을 선택하세요.',
import_parse_error:'분석 실패:',
todo_title:'할 일 목록',
todo_empty:'예정된 일정 없음'
});
LC.defLang('fr',{
nm:'Français',ct:'Personnaliser Mon Calendrier de Vie',cs:'Remplissez vos infos, zoomez pour voyager dans votre vie',ln:'Mon nom',lb:'Ma date de naissance',ll:'J\'espère pouvoir vivre jusqu\'à',uy:'ans',
bg:'✦ Commencer Mon Voyage ✦',am:'Cher, l\'âge attendu ne peut dépasser 120 💗',al:'Cher 💗, ne sois pas taquin~ Vous avez déjà {a}. Veuillez entrer un âge supérieur.',
zh:'Défiler pour zoomer · Plongez dans votre vie',ov:'Vue d\'ensemble',bt:'Aujourd\'hui',ex:'Déconnexion',ty:'Cette Année',tm:'Ce Mois',vl:'Vue de vie',vm:'Vue mensuelle',vd:'Vue quotidienne',
et:'Nouvel Événement',em:'Heure',ed:'Description (facultatif)',sv:'Enregistrer',cn:'Annuler',dl:'Supprimer',ne:'Aucun événement',fa:'Veuillez remplir tous les champs',bf:'La date de naissance ne peut être future',
mo:['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],wd:['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
tp:{w:'Travail',p:'Personnel',h:'Santé',s:'Étude',i:'Important',a:'Anniversaire',b:'Anniversaire',o:'Autre'},ml:'{m} {y}',ym:'{m} {y}',
ph_name:'Votre nom',ph_smart:'Essayez de taper "Dîner à 19h demain"',allday:'Toute la journée',start:'Début',end:'Fin',repeat:'Répéter',location:'Lieu',notes:'Notes',
rp_n:'Une fois',rp_d:'Quotidien',rp_w:'Hebdomadaire',rp_m:'Mensuel',rp_y:'Annuel',sb:'Détails',sbt:'Événements de la journée',sbh:'{h}:00',
yr:'Année', mn:'Mois', dy:'Jour', confirm_del:'Impossible de récupérer après suppression. Confirmer la suppression?',yes:'Confirmer',no:'Annuler',edit:'Modifier événement',del:'Supprimer événement',
confirm_del_recurring:'Supprimer cet événement récurrent ?', del_all:'Tout supprimer', del_single:'Supprimer uniquement celui-ci',
lifeWarn:'⚠️ Les événements à partir de {y} ne seront pas affichés, mais ne seront pas perdus. Revenez à {oldEnd} ans pour les voir.',
lifeWarnShort:'Après avoir changé l\'espérance de vie de {old} à {new},\n\nles événements à partir de l\'année {year} ne seront plus affichés.\n\nRevenir à {old} ans pour les restaurer.\n\nÊtes-vous sûr de vouloir continuer ?',
toolbox_title:'Boîte à outils',
toolbox_export:'Exporter les événements',
toolbox_import:'Importer les événements',
toolbox_logout:'Déconnexion',
tooltip_export:'🔒 Par souci de confidentialité, les événements sont stockés uniquement dans votre navigateur. Changer d\'appareil ou vider le cache les fera disparaître. Exportez régulièrement pour sauvegarder.',
import_warning_title:'⚠️ L\'importation remplacera les événements existants',
import_warning_text:'Le fichier importé remplacera complètement tous vos événements actuels. Cette action est irréversible.',
import_suggestion:'Il est recommandé d\'exporter les événements actuels comme sauvegarde avant l\'importation.',
import_confirm:'Confirmer l\'importation',
import_cancel:'Annuler',
import_success:'Importation réussie ! La page va se rafraîchir',
import_format_error:'Format de fichier invalide. Veuillez sélectionner un fichier de sauvegarde valide.',
import_parse_error:'Échec de l\'analyse : ',
todo_title:'Liste de tâches',
todo_empty:'Aucune tâche en attente'
});
LC.defLang('de',{
nm:'Deutsch',ct:'Meinen Lebenskalender gestalten',cs:'Füllen Sie Ihre Daten aus, zoomen Sie durch Ihr Leben',ln:'Mein Name',lb:'Mein Geburtsdatum',ll:'Ich hoffe, ich kann leben bis',uy:'Jahre',
bg:'✦ Meine Lebensreise starten ✦',am:'Lieber, das erwartete Alter darf 120 nicht überschreiten 💗',al:'Lieber 💗, sei nicht frech~ Du bist schon {a}. Bitte gib ein höheres Alter ein.',
zh:'Scrollen zum Zoomen · Tauche in dein Leben ein',ov:'Gesamtübersicht',bt:'Heute',ex:'Abmelden',ty:'Dieses Jahr',tm:'Dieser Monat',vl:'Lebensübersicht',vm:'Monatsansicht',vd:'Tagesansicht',
et:'Neues Ereignis',em:'Zeit',ed:'Beschreibung (optional)',sv:'Speichern',cn:'Abbrechen',dl:'Löschen',ne:'Keine Ereignisse',fa:'Bitte alle Felder ausfüllen',bf:'Geburtsdatum kann nicht in der Zukunft liegen',
mo:['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],wd:['So','Mo','Di','Mi','Do','Fr','Sa'],
tp:{w:'Arbeit',p:'Persönlich',h:'Gesundheit',s:'Studium',i:'Wichtig',a:'Jahrestag',b:'Geburtstag',o:'Sonstiges'},ml:'{m} {y}',ym:'{m} {y}',
ph_name:'Ihr Name',ph_smart:'Versuchen Sie "Abendessen um 19 Uhr morgen"',allday:'Ganztägig',start:'Start',end:'Ende',repeat:'Wiederholen',location:'Ort',notes:'Notizen',
rp_n:'Einmalig',rp_d:'Täglich',rp_w:'Wöchentlich',rp_m:'Mensual',rp_y:'Jährlich',sb:'Details',sbt:'Ganztägige Ereignisse',sbh:'{h}:00',
yr:'Jahr', mn:'Monat', dy:'Tag', confirm_del:'Kann nach dem Löschen nicht wiederhergestellt werden. Löschen bestätigen?',yes:'Bestätigen',no:'Abbrechen',edit:'Ereignis bearbeiten',del:'Ereignis löschen',
confirm_del_recurring:'Diesen wiederkehrenden Termin löschen?', del_all:'Alle löschen', del_single:'Nur diesen löschen',
lifeWarn:'⚠️ Ereignisse ab {y} werden nicht angezeigt, gehen aber nicht verloren. Zurück zu {oldEnd} Jahren, um sie zu sehen.',
lifeWarnShort:'Nach der Änderung der Lebenserwartung von {old} auf {new},\n\nwerden Ereignisse ab dem Jahr {year} nicht mehr angezeigt.\n\nZurück zu {old} Jahren, um sie wiederherzustellen.\n\nMöchten Sie fortfahren?',
toolbox_title:'Werkzeugkasten',
toolbox_export:'Ereignisse exportieren',
toolbox_import:'Ereignisse importieren',
toolbox_logout:'Abmelden',
tooltip_export:'🔒 Aus Datenschutzgründen werden Ereignisse nur in Ihrem Browser gespeichert. Gerätewechsel oder Cache-Löschung führen zu Verlust. Regelmäßig exportieren zum Sichern.',
import_warning_title:'⚠️ Import überschreibt vorhandene Ereignisse',
import_warning_text:'Die importierte Datei ersetzt vollständig alle Ihre aktuellen Ereignisse. Diese Aktion ist irreversibel.',
import_suggestion:'Es wird empfohlen, vor dem Import aktuelle Ereignisse als Backup zu exportieren.',
import_confirm:'Import bestätigen',
import_cancel:'Abbrechen',
import_success:'Import erfolgreich! Seite wird aktualisiert',
import_format_error:'Ungültiges Dateiformat. Bitte wählen Sie eine gültige Lebenskalender-Backupdatei.',
import_parse_error:'Parse fehlgeschlagen: ',
todo_title:'Aufgabenliste',
todo_empty:'Keine ausstehenden Aufgaben'
});
LC.defLang('it',{
nm:'Italiano',ct:'Personalizza il Mio Calendario di Vita',cs:'Compila i tuoi dati, zoom per viaggiare nella tua vita',ln:'Il mio nome',lb:'La mia data di nascita',ll:'Spero di poter vivere fino a',uy:'anni',
bg:'✦ Inizia il Mio Viaggio ✦',am:'Caro, l\'età prevista non può superare 120 💗',al:'Caro 💗, non fare il birichino~ Hai già {a}. Inserisci un\'età maggiore.',
zh:'Scorri per zoomare · Immergiti nella tua vita',ov:'Panoramica',bt:'Oggi',ex:'Esci',ty:'Quest\'Anno',tm:'Questo Mese',vl:'Panoramica vita',vm:'Vista mensile',vd:'Vista giornaliera',
et:'Nuovo Evento',em:'Ora',ed:'Descrizione (opzionale)',sv:'Salva',cn:'Annulla',dl:'Elimina',ne:'Nessun evento',fa:'Compila tutti i campi',bf:'La data di nascita non può essere futura',
mo:['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'],wd:['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
tp:{w:'Lavoro',p:'Personale',h:'Salute',s:'Studio',i:'Importante',a:'Anniversario',b:'Compleanno',o:'Altro'},ml:'{m} {y}',ym:'{m} {y}',
ph_name:'Il tuo nome',ph_smart:'Prova a digitare "Cena alle 19 di domani"',allday:'Tutto il giorno',start:'Inizio',end:'Fine',repeat:'Ripeti',location:'Luogo',notes:'Note',
rp_n:'Una tantum',rp_d:'Giornaliero',rp_w:'Settimanale',rp_m:'Mensile',rp_y:'Annuale',sb:'Dettagli',sbt:'Eventi intergiornalieri',sbh:'{h}:00',
yr:'Anno', mn:'Mese', dy:'Giorno', confirm_del:'Impossibile recuperare dopo l\'eliminazione. Confermare?',yes:'Conferma',no:'Annulla',edit:'Modifica evento',del:'Elimina evento',
confirm_del_recurring:'Eliminare questo evento ricorrente?', del_all:'Elimina tutti', del_single:'Elimina solo questo',
lifeWarn:'⚠️ Gli eventi dall\'anno {y} in poi non verranno mostrati, ma non andranno persi. Torna a {oldEnd} anni per vederli.',
lifeWarnShort:'Dopo aver cambiato l\'aspettativa di vita da {old} a {new},\n\ngli eventi dall\'anno {year} in poi non verranno mostrati.\n\nTorna a {old} anni per ripristinarli.\n\nSei sicuro di voler continuare?',
toolbox_title:'Cassetta degli attrezzi',
toolbox_export:'Esporta eventi',
toolbox_import:'Importa eventi',
toolbox_logout:'Esci',
tooltip_export:'🔒 Per la privacy, gli eventi sono salvati solo nel tuo browser. Cambiare dispositivo o cancellare la cache li farà perdere. Esporta regolarmente per fare backup.',
import_warning_title:'⚠️ L\'importazione sovrascriverà gli eventi esistenti',
import_warning_text:'Il file importato sostituirà completamente tutti i tuoi eventi attuali. Questa azione è irreversibile.',
import_suggestion:'Si consiglia di esportare gli eventi attuali come backup prima di importare.',
import_confirm:'Conferma importazione',
import_cancel:'Annulla',
import_success:'Importazione riuscita! La pagina si aggiornerà',
import_format_error:'Formato file non valido. Seleziona un file di backup valido.',
import_parse_error:'Analisi fallita: ',
todo_title:'Lista delle cose da fare',
todo_empty:'Nessuna attività in sospeso'
});
LC.defLang('pt',{
nm:'Português',ct:'Personalize Meu Calendário de Vida',cs:'Preencha seus dados, zoom para viajar pela sua vida',ln:'Meu nome',lb:'Minha data de nascimento',ll:'Espero poder viver até',uy:'anos',
bg:'✦ Iniciar Minha Jornada ✦',am:'Querido, a idade esperada não pode exceder 120 💗',al:'Querido 💗, pare de brincar~ Você já tem {a}. Insira uma idade maior.',
zh:'Role para zoom · Mergulhe na sua vida',ov:'Visão geral',bt:'Hoje',ex:'Sair',ty:'Este Ano',tm:'Este Mês',vl:'Visão da vida',vm:'Vista mensal',vd:'Vista diária',
et:'Novo Evento',em:'Hora',ed:'Descrição (opcional)',sv:'Salvar',cn:'Cancelar',dl:'Excluir',ne:'Sem eventos',fa:'Por favor preencha todos os campos',bf:'Data de nascimento não pode ser futura',
mo:['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],wd:['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
tp:{w:'Trabalho',p:'Pessoal',h:'Saúde',s:'Estudo',i:'Importante',a:'Aniversário',b:'Aniversário',o:'Outro'},ml:'{m} {y}',ym:'{m} {y}',
ph_name:'Seu nome',ph_smart:'Tente digitar "Jantar às 19h amanhã"',allday:'O dia todo',start:'Início',end:'Fim',repeat:'Repetir',location:'Local',notes:'Notas',
rp_n:'Uma vez',rp_d:'Diário',rp_w:'Semanal',rp_m:'Mensal',rp_y:'Anual',sb:'Detalhes',sbt:'Eventos de dia inteiro',sbh:'{h}:00',
yr:'Ano', mn:'Mês', dy:'Dia', confirm_del:'Não é possível recuperar após a exclusão. Confirmar exclusão?',yes:'Confirmar',no:'Cancelar',edit:'Editar evento',del:'Excluir evento',
confirm_del_recurring:'Excluir este evento recorrente?', del_all:'Excluir todos', del_single:'Excluir apenas este',
lifeWarn:'⚠️ Eventos a partir de {y} não serão exibidos, mas não serão perdidos. Volte para {oldEnd} anos para vê-los.',
lifeWarnShort:'Depois de mudar a expectativa de vida de {old} para {new},\n\nos eventos a partir do ano {year} não serão exibidos.\n\nVolte para {old} anos para restaurá-los.\n\nTem certeza que quer continuar?',
toolbox_title:'Caixa de Ferramentas',
toolbox_export:'Exportar Eventos',
toolbox_import:'Importar Eventos',
toolbox_logout:'Sair',
tooltip_export:'🔒 Por privacidade, os eventos são armazenados apenas no seu navegador. Trocar de dispositivo ou limpar o cache os fará perder. Exporte regularmente para fazer backup.',
import_warning_title:'⚠️ A importação substituirá os eventos existentes',
import_warning_text:'O arquivo importado substituirá completamente todos os seus eventos atuais. Esta ação é irreversível.',
import_suggestion:'Recomenda-se exportar os eventos atuais como backup antes de importar.',
import_confirm:'Confirmar Importação',
import_cancel:'Cancelar',
import_success:'Importação bem-sucedida! A página será atualizada',
import_format_error:'Formato de arquivo inválido. Selecione um arquivo de backup válido.',
import_parse_error:'Falha na análise: ',
todo_title:'Lista de tarefas',
todo_empty:'Nenhuma tarefa pendente'
});
LC.defLang('ru',{
nm:'Русский',ct:'Настроить Мой Календарь Жизни',cs:'Заполните данные, масштабируйте',ln:'Моё имя',lb:'Дата рождения',ll:'Я надеюсь дожить до',uy:'лет',
bg:'✦ Начать Путешествие Жизни ✦',am:'Дорогой, ожидаемый возраст не может превысить 120 💗',al:'Дорогой 💗, не шали~ Тебе уже {a}. Введи возраст больше текущего.',
zh:'Прокрутите для масштаба · Погрузитесь в жизнь',ov:'Общий вид',bt:'Сегодня',ex:'Выйти',ty:'Этот Год',tm:'Этот Месяц',vl:'Обзор жизни',vm:'Месяц',vd:'День',
et:'Новое событие',em:'Время',ed:'Описание (необязательно)',sv:'Сохранить',cn:'Отмена',dl:'Удалить',ne:'Нет событий',fa:'Пожалуйста, заполните все поля',bf:'Дата рождения не может быть в будущем',
mo:['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],wd:['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
tp:{w:'Работа',p:'Личное',h:'Здоровье',s:'Учёба',i:'Важное',a:'Годовщина',b:'День рождения',o:'Другое'},ml:'{m} {y}',ym:'{m} {y}',
ph_name:'Ваше имя',ph_smart:'Попробуйте ввести "Ужин в 19:00 завтра"',allday:'Весь день',start:'Начало',end:'Конец',repeat:'Повтор',location:'Место',notes:'Заметки',
rp_n:'Однократно',rp_d:'Ежедневно',rp_w:'Еженедельно',rp_m:'Ежемесячно',rp_y:'Ежегодно',sb:'Детали',sbt:'События на весь день',sbh:'{h}:00',
yr:'Год', mn:'Месяц', dy:'День', confirm_del:'Восстановление после удаления невозможно. Подтвердить удаление?',yes:'Подтвердить',no:'Отмена',edit:'Изменить событие',del:'Удалить событие',
confirm_del_recurring:'Удалить это повторяющееся событие?', del_all:'Удалить все', del_single:'Удалить только это',
lifeWarn:'⚠️ События с {y} года и далее не будут отображаться, но не будут потеряны. Вернитесь к {oldEnd} годам, чтобы увидеть их.',
lifeWarnShort:'После изменения ожидаемой продолжительности жизни с {old} на {new},\n\nсобытия начиная с {year} года и далее не будут отображаться.\n\nВернитесь к {old} годам, чтобы восстановить их.\n\nВы уверены, что хотите продолжить?',
toolbox_title:'Инструменты',
toolbox_export:'Экспорт событий',
toolbox_import:'Импорт событий',
toolbox_logout:'Выйти',
tooltip_export:'🔒 Из соображений конфиденциальности события хранятся только в вашем браузере. Смена устройства или очистка кэша приведет к их потере. Регулярно экспортируйте для резервного копирования.',
import_warning_title:'⚠️ Импорт перезапишет существующие события',
import_warning_text:'Импортированный файл полностью заменит все ваши текущие события. Это действие необратимо.',
import_suggestion:'Рекомендуется экспортировать текущие события как резервную копию перед импортом.',
import_confirm:'Подтвердить импорт',
import_cancel:'Отмена',
import_success:'Импорт успешен! Страница обновится',
import_format_error:'Неверный формат файла. Пожалуйста, выберите правильный файл резервной копии.',
import_parse_error:'Ошибка анализа: ',
todo_title:'Список дел',
todo_empty:'Нет предстоящих задач'
});
LC.defLang('ar',{
nm:'العربية',ct:'خصّص تقويم حياتي',cs:'أدخل بياناتك، كبّر للسفر عبر حياتك',ln:'اسمي',lb:'تاريخ ميلادي',ll:'آمل أن أعيش حتى',uy:'سنة',
bg:'✦ ابدأ رحلة حياتي ✦',am:'عزيزي، العمر المتوقع لا يمكن أن يتجاوز 120 💗',al:'عزيزي 💗، لا تمازحني~ عمرك بالفعل {a}. أدخل عمرًا أكبر.',
zh:'مرّر للتكبير · غص في حياتك',ov:'نظرة عامة',bt:'اليوم',ex:'تسجيل الخروج',ty:'هذا العام',tm:'هذا الشهر',vl:'نظرة على الحياة',vm:'عرض شهري',vd:'عرض يومي',
et:'حدث جديد',em:'الوقت',ed:'الوصف (اختياري)',sv:'حفظ',cn:'إلغاء',dl:'حذف',ne:'لا توجد أحداث',fa:'يرجى ملء جميع الحقول',bf:'تاريخ الميلاد لا يمكن أن يكون في المستقبل',
mo:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],wd:['أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'],
tp:{w:'عمل',p:'شخصي',h:'صحة',s:'دراسة',i:'مهم',a:'ذكرى',b:'عيد ميلاد',o:'أخرى'},ml:'{m} {y}',ym:'{m} {y}',
ph_name:'اسمك',ph_smart:'حاول كتابة "عشاء الساعة 7 مساءً غداً"',allday:'طوال اليوم',start:'بداية',end:'نهاية',repeat:'تكرار',location:'مكان',notes:'ملاحظات',
rp_n:'مرة واحدة',rp_d:'يومي',rp_w:'أسبوعي',rp_m:'شهري',rp_y:'سنوي',sb:'التفاصيل',sbt:'أحداث طوال اليوم',sbh:'{h}:00',
yr:'سنة', mn:'شهر', dy:'يوم', confirm_del:'لا يمكن الاستعادة بعد الحذف. تأكيد الحذف؟',yes:'تأكيد',no:'إلغاء',edit:'تعديل الحدث',del:'حذف الحدث',
confirm_del_recurring:'هل تريد حذف هذا الحدث المتكرر؟', del_all:'حذف الكل', del_single:'حذف هذا فقط',
lifeWarn:'⚠️ لن يتم عرض الأحداث من سنة {y} فما بعدها، ولكن لن يتم فقدانها. ارجع إلى {oldEnd} سنة لرؤيتها.',
lifeWarnShort:'بعد تغيير متوسط العمر المتوقع من {old} إلى {new}،\n\nلن يتم عرض الأحداث من سنة {year} فما بعدها.\n\nالعودة إلى {old} سنة لاستعادتها.\n\nهل أنت متأكد أنك تريد المتابعة؟',
toolbox_title:'صندوق الأدوات',
toolbox_export:'تصدير الأحداث',
toolbox_import:'استيراد الأحداث',
toolbox_logout:'تسجيل الخروج',
tooltip_export:'🔒 للخصوصية، يتم تخزين الأحداث فقط في متصفحك. تغيير الجهاز أو مسح ذاكرة التخزين المؤقت سيؤدي إلى فقدانها. قم بالتصدير بانتظام للنسخ الاحتياطي.',
import_warning_title:'⚠️ الاستيراد سيحل محل الأحداث الموجودة',
import_warning_text:'ملف الأحداث المستورد سيحل محل جميع أحداثك الحالية بالكامل. هذا الإجراء لا رجعة فيه.',
import_suggestion:'يوصى بتصدير الأحداث الحالية كنسخة احتياطية قبل الاستيراد.',
import_confirm:'تأكيد الاستيراد',
import_cancel:'إلغاء',
import_success:'تم الاستيراد بنجاح! سيتم تحديث الصفحة',
import_format_error:'تنسيق ملف غير صالح. يرجى تحديد ملف نسخ احتياطي صحيح.',
import_parse_error:'فشل التحليل: ',
todo_title:'قائمة المهام',
todo_empty:'لا توجد مهام معلقة'
});
LC.defLang('hi',{
nm:'हिन्दी',ct:'मेरा जीवन कैलेंडर अनुकूलित करें',cs:'अपनी जानकारी भरें, ज़ूम करके अपने जीवन की यात्रा करें',ln:'मेरा नाम',lb:'मेरी जन्मतिथि',ll:'मुझे उम्मीद है कि मैं जी सकता हूँ',uy:'साल',
bg:'✦ मेरी जीवन यात्रा शुरू करें ✦',am:'प्रिय, अपेक्षित आयु 120 से अधिक नहीं हो सकती 💗',al:'प्रिय 💗, मज़ाक मत करो~ तुम पहले से {a} के हो। कृपया अपनी वास्तविक आयु से अधिक आयु दर्ज करें।',
zh:'ज़ूम के लिए स्क्रॉल करें · अपने जीवन में गोता लगाएँ',ov:'सिंहावलोकन',bt:'आज',ex:'लॉग आउट',ty:'इस साल',tm:'इस महीने',vl:'जीवन अवलोकन',vm:'माह दृश्य',vd:'दिन दृश्य',
et:'नया आयोजन',em:'समय',ed:'वर्णन (वैकल्पिक)',sv:'सहेजें',cn:'रद्द करें',dl:'हटाएँ',ne:'कोई घटना नहीं',fa:'कृपया सभी फ़ील्ड भरें',bf:'जन्मतिथि भविष्य में नहीं हो सकती',
mo:['जन','फर','मार्च','अप्रैल','मई','जून','जुलाई','अग','सित','अक्टू','नव','दिस'],wd:['रवि','सोम','मंगल','बुध','गुरु','शुक्र','शनि'],
tp:{w:'काम',p:'व्यक्तिगत',h:'स्वास्थ्य',s:'अध्ययन',i:'महत्वपूर्ण',a:'सालगिरह',b:'जन्मदिन',o:'अन्य'},ml:'{m} {y}',ym:'{m} {y}',
ph_name:'आपका नाम',ph_smart:'"कल शाम 7 बजे डिनर" टाइप करके देखें',allday:'पूरा दिन',start:'शुरू',end:'अंत',repeat:'दोहराएँ',location:'स्थान',notes:'टिप्पणी',
rp_n:'एक बार',rp_d:'रोज़ाना',rp_w:'साप्ताहिक',rp_m:'मासिक',rp_y:'वार्षिक',sb:'विवरण',sbt:'पूरे दिन की घटनाएँ',sbh:'{h}:00',
yr:'वर्ष', mn:'महीना', dy:'दिन', confirm_del:'हटाने के बाद पुनर्प्राप्त नहीं किया जा सकता। हटाने की पुष्टि करें?',yes:'पुष्टि करें',no:'रद्द करें',edit:'घटना संपादित करें',del:'घटना हटाएँ',
confirm_del_recurring:'क्या आप इस आवर्ती ईवेंट को हटाना चाहते हैं?', del_all:'सभी हटाएं', del_single:'केवल यह हटाएं',
lifeWarn:'⚠️ {y} वर्ष और उसके बाद की घटनाएँ नहीं दिखाई जाएंगी, लेकिन खोई नहीं जाएंगी। उन्हें देखने के लिए {oldEnd} वर्ष पर वापस जाएं।',
lifeWarnShort:'जीवन प्रत्याशा को {old} से {new} में बदलने के बाद,\n\n{year} वर्ष और उसके बाद की घटनाएँ नहीं दिखाई जाएंगी।\n\nउन्हें पुनर्स्थापित करने के लिए {old} वर्ष पर वापस जाएं।\n\nक्या आप वाकई जारी रखना चाहते हैं?',
toolbox_title:'औजार बॉक्स',
toolbox_export:'ईवेंट निर्यात करें',
toolbox_import:'ईवेंट आयात करें',
toolbox_logout:'लॉग आउट',
tooltip_export:'🔒 गोपनीयता के लिए, ईवेंट केवल आपके ब्राउज़र में संग्रहीत होते हैं। डिवाइस बदलने या कैश साफ़ करने से वे खो जाएंगे। बैकअप के लिए नियमित रूप से निर्यात करें।',
import_warning_title:'⚠️ आयात मौजूदा ईवेंट को अधिलेखित कर देगा',
import_warning_text:'आयातित ईवेंट फ़ाइल आपके सभी मौजूदा ईवेंट को पूरी तरह से बदल देगी। यह क्रिया अपरिवर्तनीय है।',
import_suggestion:'आयात करने से पहले मौजूदा ईवेंट को बैकअप के रूप में निर्यात करने की सलाह दी जाती है।',
import_confirm:'आयात की पुष्टि करें',
import_cancel:'रद्द करें',
import_success:'आयात सफल! पृष्ठ ताज़ा हो जाएगा',
import_format_error:'अमान्य फ़ाइल स्वरूप। कृपया एक मान्य जीवन कैलेंडर बैकअप फ़ाइल चुनें।',
import_parse_error:'पार्स विफल: ',
todo_title:'कार्य सूची',
todo_empty:'कोई लंबित कार्य नहीं'
});
LC.defLang('th',{
nm:'ไทย',ct:'ปรับแต่งปฏิทินชีวิต',cs:'กรอกข้อมูล ซูมเพื่อเดินทางผ่านชีวิต',ln:'ชื่อของฉัน',lb:'วันเกิด',ll:'ฉันหวังว่าจะมีชีวิตถึง',uy:'ปี',
bg:'✦ เริ่มการเดินทาง ✦',am:'ที่รัก อายุที่คาดหวังไม่เกิน 120 💗',al:'ที่รัก 💗 อย่าซน~ คุณอายุ {a} แล้ว กรุณากรอกอายุที่มากกว่าอายุจริง',
zh:'เลื่อนเพื่อซูม · ดำดิ่งสู่ชีวิต',ov:'ภาพรวม',bt:'วันนี้',ex:'ออกจากระบบ',ty:'ปีนี้',tm:'เดือนนี้',vl:'ภาพรวมชีวิต',vm:'มุมเดือน',vd:'มุมวัน',
et:'กิจกรรมใหม่',em:'เวลา',ed:'คำอธิบาย (ไม่จำเป็น)',sv:'บันทึก',cn:'ยกเลิก',dl:'ลบ',ne:'ไม่มีกิจกรรม',fa:'กรุณากรอกข้อมูลให้ครบ',bf:'วันเกิดไม่สามารถเป็นอนาคตได้',
mo:['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'],wd:['อา','จ','อ','พ','พฤ','ศ','ส'],
tp:{w:'งาน',p:'ส่วนตัว',h:'สุขภาพ',s:'เรียน',i:'สำคัญ',a:'วันครบรอบ',b:'วันเกิด',o:'อื่น'},ml:'{m} {y}',ym:'{m} {y}',
ph_name:'ชื่อของคุณ',ph_smart:'ลองพิมพ์ "ทานข้าวเย็น 7 โมงเย็นพรุ่งนี้"',allday:'ทั้งวัน',start:'เริ่ม',end:'สิ้นสุด',repeat:'ซ้ำ',location:'สถานที่',notes:'บันทึก',
rp_n:'ครั้งเดียว',rp_d:'ทุกวัน',rp_w:'ทุกสัปดาห์',rp_m:'ทุกเดือน',rp_y:'ทุกปี',sb:'รายละเอียด',sbt:'กิจกรรมทั้งวัน',sbh:'{h}:00',
yr:'ปี', mn:'เดือน', dy:'วัน', confirm_del:'ไม่สามารถกู้คืนได้หลังจากลบ ยืนยันการลบ?',yes:'ยืนยัน',no:'ยกเลิก',edit:'แก้ไขกิจกรรม',del:'ลบกิจกรรม',
confirm_del_recurring:'ลบกิจกรรมที่เกิดซ้ำนี้หรือไม่?', del_all:'ลบทั้งหมด', del_single:'ลบเฉพาะรายการนี้',
lifeWarn:'⚠️ กิจกรรมตั้งแต่ปี {y} เป็นต้นไปจะไม่แสดง แต่จะไม่สูญหาย กลับไปที่ {oldEnd} ปีเพื่อดูอีกครั้ง',
lifeWarnShort:'หลังจากเปลี่ยนอายุขัยจาก {old} เป็น {new} ปี\n\nกิจกรรมตั้งแต่ปี {year} เป็นต้นไปจะไม่แสดง\n\nเปลี่ยนกลับเป็น {old} ปีเพื่อดูอีกครั้ง\n\nคุณต้องการดำเนินการต่อหรือไม่?',
toolbox_title:'กล่องเครื่องมือ',
toolbox_export:'ส่งออกกิจกรรม',
toolbox_import:'นำเข้ากิจกรรม',
toolbox_logout:'ออกจากระบบ',
tooltip_export:'🔒 เพื่อความเป็นส่วนตัว กิจกรรมจะถูกเก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น การเปลี่ยนอุปกรณ์หรือล้างแคชจะทำให้ข้อมูลสูญหาย ส่งออกเป็นประจำเพื่อสำรองข้อมูล',
import_warning_title:'⚠️ การนำเข้าจะแทนที่กิจกรรมที่มีอยู่',
import_warning_text:'ไฟล์กิจกรรมที่นำเข้าจะแทนที่กิจกรรมปัจจุบันทั้งหมดของคุณ การดำเนินการนี้ไม่สามารถย้อนกลับได้',
import_suggestion:'แนะนำให้ส่งออกกิจกรรมปัจจุบันเป็นข้อมูลสำรองก่อนนำเข้า',
import_confirm:'ยืนยันการนำเข้า',
import_cancel:'ยกเลิก',
import_success:'นำเข้าสำเร็จ! หน้าจะรีเฟรช',
import_format_error:'รูปแบบไฟล์ไม่ถูกต้อง กรุณาเลือกไฟล์สำรองปฏิทินชีวิตที่ถูกต้อง',
import_parse_error:'การวิเคราะห์ล้มเหลว: ',
todo_title:'รายการสิ่งที่ต้องทำ',
todo_empty:'ไม่มีกิจวัตรที่ต้องทำ'
});

/* ========= 语言系统 UI ========= */
LC.buildLangSel=function(){var sel=document.getElementById('langSel');var html='';for(var k in LC.D)html+='<option value="'+k+'"'+(k===LC.curLang?' selected':'')+'>'+LC.D[k].nm+'</option>';sel.innerHTML=html};
document.getElementById('langSel').onchange=function(){
  LC.curLang=this.value;
  localStorage.setItem(LC.LANG_KEY,LC.curLang);
  document.body.classList.toggle('rtl',LC.curLang==='ar');
  LC.refreshText();
  LC.populateBirthSelects();
};
LC.populateBirthSelects=function(){
  var yS=document.getElementById('inBirthY'), mS=document.getElementById('inBirthM'), dS=document.getElementById('inBirthD');
  var cY=new Date().getFullYear();
  var oldY=yS.value||cY-25, oldM=mS.value||1, oldD=dS.value||1;
  var yrT=LC.t('yr','Y'), mnT=LC.t('mn','M'), dyT=LC.t('dy','D');
  var yH='<option value="">'+yrT+'</option>', mH='<option value="">'+mnT+'</option>', dH='<option value="">'+dyT+'</option>';
  for(var i=cY;i>=cY-120;i--) yH+='<option value="'+i+'">'+i+'</option>';
  for(var i=1;i<=12;i++) mH+='<option value="'+i+'">'+i+'</option>';
  var days=oldY&&oldM?new Date(oldY,oldM,0).getDate():31;
  for(var i=1;i<=days;i++) dH+='<option value="'+i+'">'+i+'</option>';
  yS.innerHTML=yH; mS.innerHTML=mH; dS.innerHTML=dH;
  yS.value=oldY; mS.value=oldM; dS.value=oldD;
  yS.onchange=function(){LC.populateBirthSelects()};
  mS.onchange=function(){LC.populateBirthSelects()};
};
LC.refreshText=function(){
  try{
    document.title=LC.t('ct','Life Calendar');
    document.getElementById('cTitle').textContent=LC.t('ct','Life Calendar');
    document.getElementById('cSub').textContent=LC.t('cs','');
    document.getElementById('lName').textContent=LC.t('ln','Name');
    document.getElementById('lBirth').textContent=LC.t('lb','Birth Date');
    document.getElementById('lLife').textContent=LC.t('ll','I hope I can live to');
    document.getElementById('unitY').textContent=LC.t('uy','years');
    document.getElementById('btnGo').textContent=LC.t('bg','Start');
    document.getElementById('zoomHint').textContent=LC.t('zh','Scroll to zoom');
    
    // 底部控制栏按钮
    var btnReset = document.getElementById('btnReset');
    if(btnReset) btnReset.textContent = LC.t('ov','Overview');
    
    var btnThisYear = document.getElementById('btnThisYear');
    if(btnThisYear) btnThisYear.textContent = LC.t('ty','This Year');
    
    var btnThisMonth = document.getElementById('btnThisMonth');
    if(btnThisMonth) btnThisMonth.textContent = LC.t('tm','This Month');
    
    var btnToday = document.getElementById('btnToday');
    if(btnToday) btnToday.textContent = LC.t('bt','Today');
    
    var btnOut = document.getElementById('btnOut');
    if(btnOut) btnOut.textContent = LC.t('ex','Log out');
    
    document.getElementById('inName').placeholder=LC.t('ph_name','Your name');
    document.getElementById('confirmYes').textContent=LC.t('yes','Confirm');
    document.getElementById('confirmNo').textContent=LC.t('no','Cancel');
    document.getElementById('ctxEdit').textContent=LC.t('edit','Edit');
    document.getElementById('ctxDel').textContent=LC.t('del','Delete');
    
    // 更新待办标题多语言（如果侧边栏已打开）
    var todoTitle = document.getElementById('todoTitle');
    if (todoTitle && LC.currentSidebarDate) {
      todoTitle.innerHTML = '📋 ' + LC.t('todo_title', '待办日程');
      LC.renderTodoList(LC.currentSidebarDate);
    }
    
    // 如果侧边栏是打开的，刷新侧边栏内容
    if(LC.currentSidebarDate) {
      LC.openSidebar(LC.currentSidebarDate);
    }
    
    LC.validateAge();
    LC.closeModal();
  }catch(e){console.warn('refreshText error:',e)}
};
