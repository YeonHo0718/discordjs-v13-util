# discordjs-v13-util
> 보다 간단하게 discordjs(v13) 만지는 것을 도와주는 모듈
~~이라고믿고싶음~~

## 사용법

### Require
```javascript
const Util = require(PATH);
```

### Parameters
**`client`** : *Discord Client*  
**`guildData`** : *serverId(Number)* **or** *serverName(String)*  
**`userData`** : *userId(Number)* **or** *displayName(String)*  
**`channelData`** : *channelId(Number)* **or** *channelName(String)*  
**`channelType`** : *'text' **or** 'voice' **or** 'category' (String)*  
**`mute`** : *true* **or** *false* (Boolean)*

### Functions
**`init(client)`** : 초기 준비 작업.  
**`getGuild(guildData)`** : 특정 guild를 반환합니다.  
**`getUser(userData)`** : 특정 member를 반환합니다.  
**`getUsers(guildData||undefined)`** : 특정 서버의 모든 member를 반환합니다. 전달인자를 비우는 경우, cache에 존재하는 모든 user를 반환합니다.  
**`getChannel(guildData,channelData,channelType)`** : 특정 channel을 반환합니다.  
**`setChannel(guildData,userData,channelData)`** : 특정 voiceChannel에 있는 user를 특정 voiceChannel로 이동시킵니다.  
**`disconnect(guildData,userData)`** : 특정 voiceChannel에 있는 user를 퇴장시킵니다.  
**`mute(guildData,userData,mute)`** : 특정 voiceChannel에 있는 user의 마이크를 음소거시킵니다.  
**`deaf(guildData,userData,mute)`** : 특정 voiceChannel에 있는 user의 헤드셋을 음소거시킵니다.  
**`kick(guildData,userData)`** : 특정 guild에 있는 user를 킥합니다.  

### Example
```javascript
const Util = require("discord-util");
//...
Util.init(client);

//...
if(msg.content.startsWith('mute ')){
  try{
    const user = Util.getUser(msg.guild.id,msg.content.replace('mute ',''));
    if(user.voice!=null){
      msg.reply(Util.mute(msg.guild.id,user.id,true));
    }else{
      msg.reply('not in the voiceChannel...');
    }
  }catch(e){
    msg.reply('cannot find such user');
  }
}

```
