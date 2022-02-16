let client;

function GuildException(message) {
    this.message = message;
    this.name = 'GuildException';
}
function UserException(message) {
    this.message = message;
    this.name = 'UserException';
}
function ChannelException(message) {
    this.message = message;
    this.name = 'ChannelException';
}
function InitError(message) {
    this.message = message;
    this.name = 'InitError';
}

function init(c) {
    client = c;
    return client;
};

function getGuild(guildData) {
    if(client==undefined){
        throw new InitError("never initialized, please init by 'init(Discord.Client)'");
    }
    if(guildData == undefined){
        throw new GuildException("missing parameter 'guildData'");
    }
    let guild = client.guilds.cache.get(guildData);
    if(guild == undefined){
        guild = client.guilds.cache.find(e=>e.name==guildData);
        if(guild == undefined){
            throw new GuildException("cannot find guild");
        }
    }
    return guild;
};

function getUser(guildData,userData){
    let guild = getGuild(guildData);
    if(userData == undefined){
        throw new UserException('missing parameter userData');
    }
    let user = guild.members.cache.find(e=>e.displayName==userData);
    if(user == undefined){
        user = guild.members.cache.get(userData);
        if(user == undefined){
            throw new UserException('cannot find user');
        }
    }
    return user;
};

function getUsers(guildData){
    if(client==undefined){
        throw new InitError("never initialized, please init by 'init(discordClient)'");
    }
    if(guildData == undefined){
        return client.users.cache;
    }else{
        const guild = getGuild(guildData);
        return guild.members.cache;
    }
};

function getChannel(guildData,channelData,channelType){
    const guild = getGuild(guildData);
    if(channelData===undefined){
        throw new ChannelException('missing parameter channelData');
    }if(channelType===undefined){
        throw new ChannelException('missing parameter channelType');
    }
    const types = {
        'text': 'GUILD_TEXT',
        'voice': 'GUILD_VOICE',
        'category': 'GUILD_CATEGORY'
    }
    let type;
    let channels = guild.channels.cache;
    if(Object.keys(types).includes(channelType)){
        type = types[channelType];
        channels = channels.filter(e=>e.type == type);
    }
    if(channels.size == 0){
        throw new ChannelException('cannot find channel');
    }else{
        let channels_id = channels.filter(e=>e.id == channelData);
        if(channels_id.size == 0){
            let channels_name = channels.filter(e=>e.name == channelData);

            if(channels_name.size == 0){
                return [];
            }else{
                return channels_name;
            }
        }else{
            return channels_id;
        }
    }
};

function kick(guildData,userData){
    const user = getUser(guildData,userData);        
    user.kick();
    return user;
};

function mute(guildData,userData,mute) {
    const user = getUser(guildData,userData);
    if(user.voice.channel==null){
        throw new UserException(`user isn't in a voice channel`);
    }
    user.voice.setMute(mute);
    return mute?'mute':'unmute';
};

function deaf(guildData,userData,mute){
    const user = getUser(guildData,userData);
    user.voice.setDeaf(mute);
    return mute?'mute':'unmute';
};

function setChannel(guildData,userData,channelData){
    const user = getUser(guildData,userData);
    const channel = getChannel(guildData,channelData,'voice');
    const voice = user.voice;
    if(voice.channel == null){
        throw new ChannelException(`user isn't in a voiceChannel`);
    }else{
        if(channel.length != 0){
            voice.setChannel(channel.first().id);
            return voice;
        }else{
            throw new ChannelException(`channelData isn't about voiceChannel`);
        }
    }
};

function disconnect(guildData,userData){
    const user = getUser(guildData,userData);
    const voice = user.voice;
    if(voice.channel == null){
        throw new ChannelException(`user isn't in a voiceChannel`);
    }else{
        voice.setChannel(null);
        return voice;
    }
}

const Util = {
    init: init,
    getGuild: getGuild,
    getUser: getUser,
    getUsers: getUsers,
    getChannel: getChannel,
    kick: kick,
    mute: mute,
    deaf: deaf,
    setChannel: setChannel,
    disconnect: disconnect
}

module.exports = Util;