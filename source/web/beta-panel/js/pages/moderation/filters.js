$(function(){socket.getDBValues('moderation_get_toggles',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['linksToggle','capsToggle','spamToggle','symbolsToggle','emotesToggle','longMessageToggle','colorsToggle','spamTrackerToggle','fakePurgeToggle']},!0,function(e){$('#filter-links').prop('checked',e.linksToggle==='true');$('#filter-caps').prop('checked',e.capsToggle==='true');$('#filter-spam').prop('checked',e.spamToggle==='true');$('#filter-symbols').prop('checked',e.symbolsToggle==='true');$('#filter-emotes').prop('checked',e.emotesToggle==='true');$('#filter-messages').prop('checked',e.longMessageToggle==='true');$('#filter-me').prop('checked',e.colorsToggle==='true');$('#filter-tracker').prop('checked',e.spamTrackerToggle==='true');$('#filter-purges').prop('checked',e.fakePurgeToggle==='true')})});$(function(){$('[data-filter]').on('change',function(){socket.updateDBValue('moderation_update_filter','chatModerator',$(this).data('filter'),$(this).is(':checked'),function(){socket.sendCommand('moderation_update_filter_cmd','reloadmod',function(){toastr.success('Filter toggle successfully updated!')})})});$('#filter-links-btn').on('click',function(){socket.getDBValues('moderation_get_link_settings',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['linksMessage','linkPermitTime','subscribersModerateLinks','regularsModerateLinks','silentTimeoutLinks','silentLinkMessage','warningTimeLinks','timeoutTimeLinks']},!0,function(e){helpers.getAdvanceModal('link-settings','Link Settings','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-message','text','Warning Message','',e.linksMessage,'Message said in chat when a user gets timed-out.').append(helpers.getCheckBox('timeout-message-toggle',e.silentTimeoutLinks==='true','Silent','If the warning message should be said or not.'))).append(helpers.getInputGroup('timeout-warning-time','number','Warning Duration','0',e.warningTimeLinks,'How long in seconds the user gets timed-out for on his first offence.')).append(helpers.getInputGroup('timeout-timeout-time','number','Timeout Duration','0',e.timeoutTimeLinks,'How long in seconds the user gets timed-out for on his last offence.')).append($('<div/>',{'class':'collapse','id':'advance-collapse','style':'margin-top: 10px;','html':$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-banmsg','text','Timeout Reason','',e.silentLinkMessage,'Message shown to all moderators when the user gets timed-out.')).append(helpers.getInputGroup('permit-time','number','Permit Duration','0',e.linkPermitTime,'How long in seconds a user has to post a link when permitted.')).append($('<div/>',{'class':'form-group'}).append(helpers.getCheckBox('exclude-regulars',e.regularsModerateLinks!=='true','Exclude Regulars','If regulars should be allowed to bypass this filter.').append(helpers.getCheckBox('exclude-subscribers',e.subscribersModerateLinks!=='true','Exclude Subscribers','If subscribers should be allowed to bypass this filter.').attr('style','display: inline;'))))})),function(){let timeoutMessage=$('#timeout-message'),timeoutMessageToggle=$('#timeout-message-toggle').is(':checked')===!0,warningTime=$('#timeout-warning-time'),timeoutTime=$('#timeout-timeout-time'),timeoutReason=$('#timeout-banmsg'),permitTime=$('#permit-time'),isReg=$('#exclude-regulars').is(':checked')!==!0,isSub=$('#exclude-subscribers').is(':checked')!==!0;switch(!1){case helpers.handleInputString(timeoutMessage):case helpers.handleInputNumber(warningTime):case helpers.handleInputNumber(timeoutTime):case helpers.handleInputString(timeoutReason):case helpers.handleInputNumber(permitTime):break;default:socket.updateDBValues('moderation_update_links',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['linksMessage','linkPermitTime','subscribersModerateLinks','regularsModerateLinks','silentTimeoutLinks','silentLinkMessage','warningTimeLinks','timeoutTimeLinks'],values:[timeoutMessage.val(),permitTime.val(),isSub,isReg,timeoutMessageToggle,timeoutReason.val(),warningTime.val(),timeoutTime.val()]},function(){socket.sendCommand('moderation_update_filter_cmd','reloadmod',function(){$('#link-settings').modal('hide');toastr.success('Successfully updated the link filter settings!')})})}}).modal('toggle')})});$('#filter-caps-btn').on('click',function(){socket.getDBValues('moderation_get_caps_settings',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['capsMessage','capsLimitPercent','capsTriggerLength','subscribersModerateCaps','regularsModerateCaps','silentTimeoutCaps','silentCapMessage','warningTimeCaps','timeoutTimeCaps']},!0,function(e){helpers.getAdvanceModal('caps-settings','Caps Settings','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-message','text','Warning Message','',e.capsMessage,'Message said in chat when a user gets timed-out.').append(helpers.getCheckBox('timeout-message-toggle',e.silentTimeoutCaps==='true','Silent','If the warning message should be said or not.'))).append(helpers.getInputGroup('timeout-warning-time','number','Warning Duration','0',e.warningTimeCaps,'How long in seconds the user gets timed-out for on his first offence.')).append(helpers.getInputGroup('timeout-timeout-time','number','Timeout Duration','0',e.timeoutTimeCaps,'How long in seconds the user gets timed-out for on his last offence.')).append($('<div/>',{'class':'collapse','id':'advance-collapse','style':'margin-top: 10px;','html':$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-banmsg','text','Timeout Reason','',e.silentCapMessage,'Message shown to all moderators when the user gets timed-out.')).append(helpers.getInputGroup('caps-trigger-amount','number','Caps Trigger Amount','0',e.capsTriggerLength,'Amount of caps required in the message before checking for caps.')).append(helpers.getInputGroup('caps-amount','number','Caps Limit Percent','0',e.capsLimitPercent,'Maximum amount in percent of caps allowed in a message.')).append($('<div/>',{'class':'form-group'}).append(helpers.getCheckBox('exclude-regulars',e.regularsModerateCaps!=='true','Exclude Regulars','If regulars should be allowed to bypass this filter.').append(helpers.getCheckBox('exclude-subscribers',e.subscribersModerateCaps!=='true','Exclude Subscribers','If subscribers should be allowed to bypass this filter.').attr('style','display: inline;'))))})),function(){let timeoutMessage=$('#timeout-message'),timeoutMessageToggle=$('#timeout-message-toggle').is(':checked')===!0,warningTime=$('#timeout-warning-time'),timeoutTime=$('#timeout-timeout-time'),timeoutReason=$('#timeout-banmsg'),capsTrigger=$('#caps-trigger-amount'),capsLimit=$('#caps-amount'),isReg=$('#exclude-regulars').is(':checked')!==!0,isSub=$('#exclude-subscribers').is(':checked')!==!0;switch(!1){case helpers.handleInputString(timeoutMessage):case helpers.handleInputNumber(warningTime):case helpers.handleInputNumber(timeoutTime):case helpers.handleInputString(timeoutReason):case helpers.handleInputNumber(capsTrigger):case helpers.handleInputNumber(capsLimit):break;default:socket.updateDBValues('moderation_update_caps',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['capsMessage','capsLimitPercent','capsTriggerLength','subscribersModerateCaps','regularsModerateCaps','silentTimeoutCaps','silentCapMessage','warningTimeCaps','timeoutTimeCaps'],values:[timeoutMessage.val(),capsLimit.val(),capsTrigger.val(),isSub,isReg,timeoutMessageToggle,timeoutReason.val(),warningTime.val(),timeoutTime.val()]},function(){socket.sendCommand('moderation_update_filter_cmd','reloadmod',function(){$('#caps-settings').modal('hide');toastr.success('Successfully updated the caps filter settings!')})})}}).modal('toggle')})});$('#filter-symbols-btn').on('click',function(){socket.getDBValues('moderation_get_symbols_settings',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['symbolsMessage','symbolsLimitPercent','symbolsGroupLimit','symbolsTriggerLength','subscribersModerateSymbols','regularsModerateSymbols','silentTimeoutSymbols','silentSymbolsMessage','warningTimeSymbols','timeoutTimeSymbols']},!0,function(e){helpers.getAdvanceModal('symbols-settings','Symbols Settings','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-message','text','Warning Message','',e.symbolsMessage,'Message said in chat when a user gets timed-out.').append(helpers.getCheckBox('timeout-message-toggle',e.silentTimeoutSymbols==='true','Silent','If the warning message should be said or not.'))).append(helpers.getInputGroup('timeout-warning-time','number','Warning Duration','0',e.warningTimeSymbols,'How long in seconds the user gets timed-out for on his first offence.')).append(helpers.getInputGroup('timeout-timeout-time','number','Timeout Duration','0',e.timeoutTimeSymbols,'How long in seconds the user gets timed-out for on his last offence.')).append($('<div/>',{'class':'collapse','id':'advance-collapse','style':'margin-top: 10px;','html':$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-banmsg','text','Timeout Reason','',e.silentSymbolsMessage,'Message shown to all moderators when the user gets timed-out.')).append(helpers.getInputGroup('symbols-trigger-amount','number','Symbols Trigger Amount','0',e.symbolsTriggerLength,'Amount of symbols required in the message before checking for symbols.')).append(helpers.getInputGroup('symbols-amount','number','Symbols Limit Percent','0',e.symbolsLimitPercent,'Maximum amount in percent of symbols allowed in a message.')).append(helpers.getInputGroup('symbols-amount-group','number','Symbols Group Limit','0',e.symbolsGroupLimit,'Maximum amount of groupped symbols allowed.')).append($('<div/>',{'class':'form-group'}).append(helpers.getCheckBox('exclude-regulars',e.regularsModerateSymbols!=='true','Exclude Regulars','If regulars should be allowed to bypass this filter.').append(helpers.getCheckBox('exclude-subscribers',e.subscribersModerateSymbols!=='true','Exclude Subscribers','If subscribers should be allowed to bypass this filter.').attr('style','display: inline;'))))})),function(){let timeoutMessage=$('#timeout-message'),timeoutMessageToggle=$('#timeout-message-toggle').is(':checked')===!0,warningTime=$('#timeout-warning-time'),timeoutTime=$('#timeout-timeout-time'),timeoutReason=$('#timeout-banmsg'),symbolsTrigger=$('#symbols-trigger-amount'),symbolsLimit=$('#symbols-amount'),symbolsLimitGroup=$('#symbols-amount-group'),isReg=$('#exclude-regulars').is(':checked')!==!0,isSub=$('#exclude-subscribers').is(':checked')!==!0;switch(!1){case helpers.handleInputString(timeoutMessage):case helpers.handleInputNumber(warningTime):case helpers.handleInputNumber(timeoutTime):case helpers.handleInputString(timeoutReason):case helpers.handleInputNumber(symbolsTrigger):case helpers.handleInputNumber(symbolsLimit):case helpers.handleInputNumber(symbolsLimitGroup):break;default:socket.updateDBValues('moderation_update_symbols',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['symbolsMessage','symbolsLimitPercent','symbolsGroupLimit','symbolsTriggerLength','subscribersModerateSymbols','regularsModerateSymbols','silentTimeoutSymbols','silentSymbolsMessage','warningTimeSymbols','timeoutTimeSymbols'],values:[timeoutMessage.val(),symbolsLimit.val(),symbolsLimitGroup.val(),symbolsTrigger.val(),isSub,isReg,timeoutMessageToggle,timeoutReason.val(),warningTime.val(),timeoutTime.val()]},function(){socket.sendCommand('moderation_update_filter_cmd','reloadmod',function(){$('#symbols-settings').modal('hide');toastr.success('Successfully updated the symbols filter settings!')})})}}).modal('toggle')})});$('#filter-spam-btn').on('click',function(){socket.getDBValues('moderation_get_spam_settings',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['spamMessage','spamLimit','subscribersModerateSpam','regularsModerateSpam','silentTimeoutSpam','silentSpamMessage','warningTimeSpam','timeoutTimeSpam']},!0,function(e){helpers.getAdvanceModal('spam-settings','Spam Settings','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-message','text','Warning Message','',e.spamMessage,'Message said in chat when a user gets timed-out.').append(helpers.getCheckBox('timeout-message-toggle',e.silentTimeoutSpam==='true','Silent','If the warning message should be said or not.'))).append(helpers.getInputGroup('timeout-warning-time','number','Warning Duration','0',e.warningTimeSpam,'How long in seconds the user gets timed-out for on his first offence.')).append(helpers.getInputGroup('timeout-timeout-time','number','Timeout Duration','0',e.timeoutTimeSpam,'How long in seconds the user gets timed-out for on his last offence.')).append($('<div/>',{'class':'collapse','id':'advance-collapse','style':'margin-top: 10px;','html':$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-banmsg','text','Timeout Reason','',e.silentSpamMessage,'Message shown to all moderators when the user gets timed-out.')).append(helpers.getInputGroup('spam-amount','number','Spam Limit','0',e.spamLimit,'Amount of repeating characters allowed in a message.')).append($('<div/>',{'class':'form-group'}).append(helpers.getCheckBox('exclude-regulars',e.regularsModerateSpam!=='true','Exclude Regulars','If regulars should be allowed to bypass this filter.').append(helpers.getCheckBox('exclude-subscribers',e.subscribersModerateSpam!=='true','Exclude Subscribers','If subscribers should be allowed to bypass this filter.').attr('style','display: inline;'))))})),function(){let timeoutMessage=$('#timeout-message'),timeoutMessageToggle=$('#timeout-message-toggle').is(':checked')===!0,warningTime=$('#timeout-warning-time'),timeoutTime=$('#timeout-timeout-time'),timeoutReason=$('#timeout-banmsg'),spamLimit=$('#spam-amount'),isReg=$('#exclude-regulars').is(':checked')!==!0,isSub=$('#exclude-subscribers').is(':checked')!==!0;switch(!1){case helpers.handleInputString(timeoutMessage):case helpers.handleInputNumber(warningTime):case helpers.handleInputNumber(timeoutTime):case helpers.handleInputString(timeoutReason):case helpers.handleInputNumber(spamLimit):break;default:socket.updateDBValues('moderation_update_spam',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['spamMessage','spamLimit','subscribersModerateSpam','regularsModerateSpam','silentTimeoutSpam','silentSpamMessage','warningTimeSpam','timeoutTimeSpam'],values:[timeoutMessage.val(),spamLimit.val(),isSub,isReg,timeoutMessageToggle,timeoutReason.val(),warningTime.val(),timeoutTime.val()]},function(){socket.sendCommand('moderation_update_filter_cmd','reloadmod',function(){$('#spam-settings').modal('hide');toastr.success('Successfully updated the spam filter settings!')})})}}).modal('toggle')})});$('#filter-emotes-btn').on('click',function(){socket.getDBValues('moderation_get_emotes_settings',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['emotesMessage','emotesLimit','subscribersModerateEmotes','regularsModerateEmotes','silentTimeoutEmotes','silentEmoteMessage','warningTimeEmotes','timeoutTimeEmotes']},!0,function(e){helpers.getAdvanceModal('emotes-settings','Emotes Settings','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-message','text','Warning Message','',e.emotesMessage,'Message said in chat when a user gets timed-out.').append(helpers.getCheckBox('timeout-message-toggle',e.silentTimeoutEmotes==='true','Silent','If the warning message should be said or not.'))).append(helpers.getInputGroup('timeout-warning-time','number','Warning Duration','0',e.warningTimeEmotes,'How long in seconds the user gets timed-out for on his first offence.')).append(helpers.getInputGroup('timeout-timeout-time','number','Timeout Duration','0',e.timeoutTimeEmotes,'How long in seconds the user gets timed-out for on his last offence.')).append($('<div/>',{'class':'collapse','id':'advance-collapse','style':'margin-top: 10px;','html':$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-banmsg','text','Timeout Reason','',e.silentEmoteMessage,'Message shown to all moderators when the user gets timed-out.')).append(helpers.getInputGroup('emote-amount','number','Emote Limit','0',e.emotesLimit,'Amount of emotes allowed in a message.')).append($('<div/>',{'class':'form-group'}).append(helpers.getCheckBox('exclude-regulars',e.regularsModerateEmotes!=='true','Exclude Regulars','If regulars should be allowed to bypass this filter.').append(helpers.getCheckBox('exclude-subscribers',e.subscribersModerateEmotes!=='true','Exclude Subscribers','If subscribers should be allowed to bypass this filter.').attr('style','display: inline;'))))})),function(){let timeoutMessage=$('#timeout-message'),timeoutMessageToggle=$('#timeout-message-toggle').is(':checked')===!0,warningTime=$('#timeout-warning-time'),timeoutTime=$('#timeout-timeout-time'),timeoutReason=$('#timeout-banmsg'),emoteLimit=$('#emote-amount'),isReg=$('#exclude-regulars').is(':checked')!==!0,isSub=$('#exclude-subscribers').is(':checked')!==!0;switch(!1){case helpers.handleInputString(timeoutMessage):case helpers.handleInputNumber(warningTime):case helpers.handleInputNumber(timeoutTime):case helpers.handleInputString(timeoutReason):case helpers.handleInputNumber(emoteLimit):break;default:socket.updateDBValues('moderation_update_emotes',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['emotesMessage','emotesLimit','subscribersModerateEmotes','regularsModerateEmotes','silentTimeoutEmotes','silentEmoteMessage','warningTimeEmotes','timeoutTimeEmotes'],values:[timeoutMessage.val(),emoteLimit.val(),isSub,isReg,timeoutMessageToggle,timeoutReason.val(),warningTime.val(),timeoutTime.val()]},function(){socket.sendCommand('moderation_update_filter_cmd','reloadmod',function(){$('#emotes-settings').modal('hide');toastr.success('Successfully updated the emotes filter settings!')})})}}).modal('toggle')})});$('#filter-me-btn').on('click',function(){socket.getDBValues('moderation_get_me_settings',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['colorsMessage','subscribersModerateColors','regularsModerateColors','silentTimeoutColors','silentColorMessage','warningTimeColors','timeoutTimeColors']},!0,function(e){helpers.getAdvanceModal('me-settings','Me Settings','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-message','text','Warning Message','',e.colorsMessage,'Message said in chat when a user gets timed-out.').append(helpers.getCheckBox('timeout-message-toggle',e.silentTimeoutColors==='true','Silent','If the warning message should be said or not.'))).append(helpers.getInputGroup('timeout-warning-time','number','Warning Duration','0',e.warningTimeColors,'How long in seconds the user gets timed-out for on his first offence.')).append(helpers.getInputGroup('timeout-timeout-time','number','Timeout Duration','0',e.timeoutTimeColors,'How long in seconds the user gets timed-out for on his last offence.')).append($('<div/>',{'class':'collapse','id':'advance-collapse','style':'margin-top: 10px;','html':$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-banmsg','text','Timeout Reason','',e.silentColorMessage,'Message shown to all moderators when the user gets timed-out.')).append($('<div/>',{'class':'form-group'}).append(helpers.getCheckBox('exclude-regulars',e.regularsModerateColors!=='true','Exclude Regulars','If regulars should be allowed to bypass this filter.').append(helpers.getCheckBox('exclude-subscribers',e.subscribersModerateColors!=='true','Exclude Subscribers','If subscribers should be allowed to bypass this filter.').attr('style','display: inline;'))))})),function(){let timeoutMessage=$('#timeout-message'),timeoutMessageToggle=$('#timeout-message-toggle').is(':checked')===!0,warningTime=$('#timeout-warning-time'),timeoutTime=$('#timeout-timeout-time'),timeoutReason=$('#timeout-banmsg'),isReg=$('#exclude-regulars').is(':checked')!==!0,isSub=$('#exclude-subscribers').is(':checked')!==!0;switch(!1){case helpers.handleInputString(timeoutMessage):case helpers.handleInputNumber(warningTime):case helpers.handleInputNumber(timeoutTime):case helpers.handleInputString(timeoutReason):break;default:socket.updateDBValues('moderation_update_me',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['colorsMessage','subscribersModerateColors','regularsModerateColors','silentTimeoutColors','silentColorMessage','warningTimeColors','timeoutTimeColors'],values:[timeoutMessage.val(),isSub,isReg,timeoutMessageToggle,timeoutReason.val(),warningTime.val(),timeoutTime.val()]},function(){socket.sendCommand('moderation_update_filter_cmd','reloadmod',function(){$('#me-settings').modal('hide');toastr.success('Successfully updated the me filter settings!')})})}}).modal('toggle')})});$('#filter-msglen-btn').on('click',function(){socket.getDBValues('moderation_get_msglen_settings',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['longMessageMessage','longMessageLimit','subscribersModerateLongMsg','regularsModerateLongMsg','silentTimeoutLongMsg','silentLongMessage','warningTimeLongMsg','timeoutTimeLongMsg']},!0,function(e){helpers.getAdvanceModal('msglen-settings','Long Message Settings','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-message','text','Warning Message','',e.longMessageMessage,'Message said in chat when a user gets timed-out.').append(helpers.getCheckBox('timeout-message-toggle',e.silentTimeoutLongMsg==='true','Silent','If the warning message should be said or not.'))).append(helpers.getInputGroup('timeout-warning-time','number','Warning Duration','0',e.warningTimeLongMsg,'How long in seconds the user gets timed-out for on his first offence.')).append(helpers.getInputGroup('timeout-timeout-time','number','Timeout Duration','0',e.timeoutTimeLongMsg,'How long in seconds the user gets timed-out for on his last offence.')).append($('<div/>',{'class':'collapse','id':'advance-collapse','style':'margin-top: 10px;','html':$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-banmsg','text','Timeout Reason','',e.silentLongMessage,'Message shown to all moderators when the user gets timed-out.')).append(helpers.getInputGroup('msg-limit','number','Message Charcater Limit','0',e.longMessageLimit,'Amount of characters allowed in a message.')).append($('<div/>',{'class':'form-group'}).append(helpers.getCheckBox('exclude-regulars',e.regularsModerateLongMsg!=='true','Exclude Regulars','If regulars should be allowed to bypass this filter.').append(helpers.getCheckBox('exclude-subscribers',e.subscribersModerateLongMsg!=='true','Exclude Subscribers','If subscribers should be allowed to bypass this filter.').attr('style','display: inline;'))))})),function(){let timeoutMessage=$('#timeout-message'),timeoutMessageToggle=$('#timeout-message-toggle').is(':checked')===!0,warningTime=$('#timeout-warning-time'),timeoutTime=$('#timeout-timeout-time'),timeoutReason=$('#timeout-banmsg'),msgLimit=$('#msg-limit'),isReg=$('#exclude-regulars').is(':checked')!==!0,isSub=$('#exclude-subscribers').is(':checked')!==!0;switch(!1){case helpers.handleInputString(timeoutMessage):case helpers.handleInputNumber(warningTime):case helpers.handleInputNumber(timeoutTime):case helpers.handleInputString(timeoutReason):case helpers.handleInputString(msgLimit):break;default:socket.updateDBValues('moderation_update_longmsg',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['longMessageMessage','longMessageLimit','subscribersModerateLongMsg','regularsModerateLongMsg','silentTimeoutLongMsg','silentLongMessage','warningTimeLongMsg','timeoutTimeLongMsg'],values:[timeoutMessage.val(),msgLimit.val(),isSub,isReg,timeoutMessageToggle,timeoutReason.val(),warningTime.val(),timeoutTime.val()]},function(){socket.sendCommand('moderation_update_filter_cmd','reloadmod',function(){$('#msglen-settings').modal('hide');toastr.success('Successfully updated the message length filter settings!')})})}}).modal('toggle')})});$('#filter-purges-btn').on('click',function(){socket.getDBValues('moderation_get_purges_settings',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['fakePurgeMessage','subscribersModerateFakePurge','regularsModerateFakePurge','silentTimeoutFakePurge','silentFakePurgeMessage','warningTimeFakePurge','timeoutTimeFakePurge']},!0,function(e){helpers.getAdvanceModal('purges-settings','Fake Purge Settings','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-message','text','Warning Message','',e.fakePurgeMessage,'Message said in chat when a user gets timed-out.').append(helpers.getCheckBox('timeout-message-toggle',e.silentTimeoutFakePurge==='true','Silent','If the warning message should be said or not.'))).append(helpers.getInputGroup('timeout-warning-time','number','Warning Duration','0',e.warningTimeFakePurge,'How long in seconds the user gets timed-out for on his first offence.')).append(helpers.getInputGroup('timeout-timeout-time','number','Timeout Duration','0',e.timeoutTimeFakePurge,'How long in seconds the user gets timed-out for on his last offence.')).append($('<div/>',{'class':'collapse','id':'advance-collapse','style':'margin-top: 10px;','html':$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-banmsg','text','Timeout Reason','',e.silentFakePurgeMessage,'Message shown to all moderators when the user gets timed-out.')).append($('<div/>',{'class':'form-group'}).append(helpers.getCheckBox('exclude-regulars',e.regularsModerateFakePurge!=='true','Exclude Regulars','If regulars should be allowed to bypass this filter.').append(helpers.getCheckBox('exclude-subscribers',e.subscribersModerateFakePurge!=='true','Exclude Subscribers','If subscribers should be allowed to bypass this filter.').attr('style','display: inline;'))))})),function(){let timeoutMessage=$('#timeout-message'),timeoutMessageToggle=$('#timeout-message-toggle').is(':checked')===!0,warningTime=$('#timeout-warning-time'),timeoutTime=$('#timeout-timeout-time'),timeoutReason=$('#timeout-banmsg'),isReg=$('#exclude-regulars').is(':checked')!==!0,isSub=$('#exclude-subscribers').is(':checked')!==!0;switch(!1){case helpers.handleInputString(timeoutMessage):case helpers.handleInputNumber(warningTime):case helpers.handleInputNumber(timeoutTime):case helpers.handleInputString(timeoutReason):break;default:socket.updateDBValues('moderation_update_purges',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['fakePurgeMessage','subscribersModerateFakePurge','regularsModerateFakePurge','silentTimeoutFakePurge','silentFakePurgeMessage','warningTimeFakePurge','timeoutTimeFakePurge'],values:[timeoutMessage.val(),isSub,isReg,timeoutMessageToggle,timeoutReason.val(),warningTime.val(),timeoutTime.val()]},function(){socket.sendCommand('moderation_update_filter_cmd','reloadmod',function(){$('#purges-settings').modal('hide');toastr.success('Successfully updated the fake purge filter settings!')})})}}).modal('toggle')})});$('#filter-tracker-btn').on('click',function(){socket.getDBValues('moderation_get_msglen_settings',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['spamTrackerMessage','spamTrackerTime','spamTrackerLimit','subscribersModerateSpamTracker','regularsModerateSpamTracker','silentTimeoutSpamTracker','silentSpamTrackerMessage','warningTimeSpamTracker','timeoutTimeSpamTracker']},!0,function(e){helpers.getAdvanceModal('tracker-settings','User Moderation Settings','Save',$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-message','text','Warning Message','',e.spamTrackerMessage,'Message said in chat when a user gets timed-out.').append(helpers.getCheckBox('timeout-message-toggle',e.silentTimeoutSpamTracker==='true','Silent','If the warning message should be said or not.'))).append(helpers.getInputGroup('timeout-warning-time','number','Warning Duration','0',e.warningTimeSpamTracker,'How long in seconds the user gets timed-out for on his first offence.')).append(helpers.getInputGroup('timeout-timeout-time','number','Timeout Duration','0',e.timeoutTimeSpamTracker,'How long in seconds the user gets timed-out for on his last offence.')).append($('<div/>',{'class':'collapse','id':'advance-collapse','style':'margin-top: 10px;','html':$('<form/>',{'role':'form'}).append(helpers.getInputGroup('timeout-banmsg','text','Timeout Reason','',e.silentSpamTrackerMessage,'Message shown to all moderators when the user gets timed-out.')).append(helpers.getInputGroup('track-time','number','Message Reset Time','0',e.spamTrackerTime,'How long until the message count the user has sent resets.')).append(helpers.getInputGroup('track-limit','number','Message Limit','0',e.spamTrackerLimit,'How many messages users can send in the reset time period.')).append($('<div/>',{'class':'form-group'}).append(helpers.getCheckBox('exclude-regulars',e.regularsModerateSpamTracker!=='true','Exclude Regulars','If regulars should be allowed to bypass this filter.').append(helpers.getCheckBox('exclude-subscribers',e.subscribersModerateSpamTracker!=='true','Exclude Subscribers','If subscribers should be allowed to bypass this filter.').attr('style','display: inline;'))))})),function(){let timeoutMessage=$('#timeout-message'),timeoutMessageToggle=$('#timeout-message-toggle').is(':checked')===!0,warningTime=$('#timeout-warning-time'),timeoutTime=$('#timeout-timeout-time'),timeoutReason=$('#timeout-banmsg'),trackTime=$('#track-time'),trackLimit=$('#track-time'),isReg=$('#exclude-regulars').is(':checked')!==!0,isSub=$('#exclude-subscribers').is(':checked')!==!0;switch(!1){case helpers.handleInputString(timeoutMessage):case helpers.handleInputNumber(warningTime):case helpers.handleInputNumber(timeoutTime):case helpers.handleInputString(timeoutReason):case helpers.handleInputString(trackTime):case helpers.handleInputString(trackLimit):break;default:socket.updateDBValues('moderation_update_tracker',{tables:['chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator','chatModerator'],keys:['spamTrackerMessage','spamTrackerTime','spamTrackerLimit','subscribersModerateSpamTracker','regularsModerateSpamTracker','silentTimeoutSpamTracker','silentSpamTrackerMessage','warningTimeSpamTracker','timeoutTimeSpamTracker'],values:[timeoutMessage.val(),trackTime.val(),trackLimit.val(),isSub,isReg,timeoutMessageToggle,timeoutReason.val(),warningTime.val(),timeoutTime.val()]},function(){socket.sendCommand('moderation_update_filter_cmd','reloadmod',function(){$('#tracker-settings').modal('hide');toastr.success('Successfully updated the user moderation filter settings!')})})}}).modal('toggle')})});window.location.hash='#'})