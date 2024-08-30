using System;
using API.Data;
using SQLitePCL;

namespace API.SignalR;

public class PresenceTracker
{
    private static readonly Dictionary<string, List<string>> OnlineUsers = [];

    public Task<bool> UserConnected(string username, string connectionID)
    {
        var isOnline = false;
        lock(OnlineUsers)
        {
            if(OnlineUsers.ContainsKey(username))
            {
                OnlineUsers[username].Add(connectionID);
            }
            else
            {
                OnlineUsers.Add(username, [connectionID]);
                isOnline = true;
            }
        }
        return Task.FromResult(isOnline);
    }

    public Task<bool> UserDisconnected(string username, string connectionID)
    {
        var isOffline = false;
        lock(OnlineUsers)
        {
            if(!OnlineUsers.ContainsKey(username)) return Task.FromResult(isOffline);

            OnlineUsers[username].Remove(connectionID);

            if(OnlineUsers[username].Count == 0) //ova e tuka posho mozhe da e logiran na dr mesto i ne treba da go izbacime
            //treba samo da se removene toj connectionID i ako nema nitu eden ostanat toash go trgame od dict
            {
                OnlineUsers.Remove(username);
                isOffline = true;
            }
        }
        return Task.FromResult(isOffline);
    }

    public Task<string[]> GetOnlineUsers()
    {
        string[] onlineUsers;
        lock(OnlineUsers)
        {
            onlineUsers = OnlineUsers.OrderBy(k => k.Key).Select(k => k.Key).ToArray();
        }
        return Task.FromResult(onlineUsers);
    }

    public static Task<List<string>> GetConnectionForUser(string username)
    {
        List<string> connectionIds;
        if(OnlineUsers.TryGetValue(username, out var connections))
        {
            lock(connections)
            {
                connectionIds = connections.ToList();
            }
        }
        else
        {
            connectionIds = [];
        }

        return Task.FromResult(connectionIds);
    }
}
