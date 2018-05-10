$(run=function(){socket.getDBTableValuesByOrder('time_top_get_order','time',100,0,'DESC',!0,function(results){let tableData=[];for(let i=0;i<results.length;i++){tableData.push([(i+1),results[i].key,results[i].value,Math.floor(parseInt(results[i].value)/3600)])}
if($.fn.DataTable.isDataTable('#loyaltyTop')){$('#loyaltyTop').DataTable().destroy();$('#loyaltyTop').off()}
$('#loyaltyTop').DataTable({'searching':!0,'autoWidth':!1,'lengthChange':!1,'data':tableData,'pageLength':15,'columnDefs':[{'width':'15%','targets':0},{'width':'25%','targets':1}],'columns':[{'title':'Position'},{'title':'Username'},{'title':'Time (Seconds)'},{'title':'Time (Hours)'}]});$('#loyalty-top-title').html('Top 100 Loyalty')});socket.getDBValues('time_get_settings',{tables:['timeSettings','timeSettings','timeSettings','timeSettings','settings','settings'],keys:['timeLevel','timeLevelWarning','keepTimeWhenOffline','timePromoteHours','topListAmountTime','timezone']},!0,function(e){$('#loyalty-timezone').val((e.timezone===null?'GMT':e.timezone));$('#time-offline').val((e.keepTimeWhenOffline==='true'?'Yes':'No'));$('#time-promote').val((e.timeLevel==='true'?'Yes':'No'));$('#time-promote-notice').val((e.timeLevelWarning==='true'?'Yes':'No'));$('#loyalty-promotion').val(e.timePromoteHours);$('#loyalty-top').val(e.topListAmountTime)})});$(function(){var currencyOffset=100;$('#loyalty-load-more').on('click',function(){let table=$('#loyaltyTop').DataTable(),dataCount=table.rows().count(),tableData=[];if(currencyOffset===dataCount){toastr.success('Loading more users into the table.');socket.getDBTableValuesByOrder('time_top_get_order_btn','time',100,(currencyOffset+100),'DESC',!0,function(results){for(let i=0;i<results.length;i++){tableData.push([(++currencyOffset),results[i].key,results[i].value,Math.floor(parseInt(results[i].value)/3600)])}
table.rows.add(tableData).draw(!1);$('#loyalty-top-title').html('Top '+helpers.parseNumber(currencyOffset)+' Loyalty')})}else{toastr.error('Cannot load more time since there are currently some being loaded.')}});$('#loyalty-reload').on('click',function(){run();toastr.success('Successfully updated the top 100 table.')});$('#time-get-user').on('click',function(){let username=$('#time-username').val().toLowerCase();if(username.length>0){socket.getDBValue('time_get_user_total','time',username,function(e){$('#time-username-time').val((e.time===null?'0':e.time))})}});$('#time-save-user').on('click',function(){let username=$('#time-username'),time=$('#time-username-time');switch(!1){case helpers.handleInputString(username):case helpers.handleInputNumber(time):break;default:socket.updateDBValue('time_update_user','time',username.val().toLowerCase(),time.val(),function(){toastr.success('Successfully updated user time!');username.val('');time.val('')})}});$('#loyalty-save-all').on('click',function(){let timeZone=$('#loyalty-timezone'),countOfflineTime=$('#time-offline').find(':selected').text()==='Yes',timePromote=$('#time-promote').find(':selected').text()==='Yes',timePromoteNotice=$('#time-promote-notice').find(':selected').text()==='Yes',regHours=$('#loyalty-promotion'),timeTop=$('#loyalty-top');switch(!1){case helpers.handleInputString(timeZone):case helpers.handleInputNumber(regHours):case helpers.handleInputNumber(timeTop):break;default:socket.updateDBValues('time_update_settings',{tables:['timeSettings','timeSettings','timeSettings','timeSettings','settings','settings'],keys:['timeLevel','timeLevelWarning','keepTimeWhenOffline','timePromoteHours','topListAmountTime','timezone'],values:[timePromote,timePromoteNotice,countOfflineTime,regHours.val(),(parseInt(timeTop.val())>15?15:timeTop.val()),timeZone.val()]},function(){socket.sendCommand('update_time_settings_cmd','reloadtop',function(){toastr.success('Successfully updated time settings!')})})}});window.location.hash='#'})