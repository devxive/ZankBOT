$(run=function(){socket.getDBTableValues('moderation_whitelist_get','whiteList',function(results){let tableData=[];for(let i=0;i<results.length;i++){tableData.push([results[i].key,$('<div/>',{'class':'btn-group'}).append($('<button/>',{'type':'button','class':'btn btn-xs btn-danger','style':'float: right','data-whitelist':results[i].key,'html':$('<i/>',{'class':'fa fa-trash'})})).append($('<button/>',{'type':'button','class':'btn btn-xs btn-warning','style':'float: right','data-whitelist':results[i].key,'html':$('<i/>',{'class':'fa fa-edit'})})).html()])}
if($.fn.DataTable.isDataTable('#whitelistTable')){$('#whitelistTable').DataTable().destroy();$('#whitelistTable').off()}
let table=$('#whitelistTable').DataTable({'searching':!0,'autoWidth':!1,'lengthChange':!1,'data':tableData,'columnDefs':[{'className':'default-table','orderable':!1,'targets':1}],'columns':[{'title':'Whitelist'},{'title':'Actions'}]});table.on('click','.btn-danger',function(){let whitelist=$(this).data('whitelist'),row=$(this).parents('tr');socket.removeDBValue('whitelist_remove','whiteList',whitelist,function(){socket.sendCommand('whitelist_remove_cmd','reloadmod',function(){table.row(row).remove().draw(!1);toastr.success('Successfully removed whitelist!')})})});table.on('click','.btn-warning',function(){let whitelist=$(this).data('whitelist'),t=$(this);helpers.getModal('edit-whitelist','Edit Whitelist','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('whitelist-name','text','Url','',whitelist,'Url that is whitelisted.')),function(){let w=$('#whitelist-name');switch(!1){case helpers.handleInputString(w):break;default:socket.removeDBValue('whitelist_remove','whiteList',whitelist,function(){socket.updateDBValue('whitelist_edit','whiteList',w.val().toLowerCase(),'true',function(){socket.sendCommand('whitelist_remove_cmd','reloadmod',function(){t.parents('tr').find('td:eq(0)').text(w.val());$('#edit-whitelist').modal('hide');toastr.success('Successfully edited whitelist!')})})})}}).modal('toggle')})})});$(function(){$('#add-whitelist-button').on('click',function(){helpers.getModal('add-whitelist','Add Whitelist','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('whitelist-name','text','Url','https://phantombot.tv','','Url that will be whitelisted.')),function(){let whitelist=$('#whitelist-name');switch(!1){case helpers.handleInputString(whitelist):break;default:socket.updateDBValue('whitelist_add','whiteList',whitelist.val().toLowerCase(),'true',function(){socket.sendCommand('whitelist_add_cmd','reloadmod',function(){run();$('#add-whitelist').modal('hide');toastr.success('Successfully added whitelist!')})})}}).modal('toggle')});window.location.hash='#'})