using System;
using API.DTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface ILikesRepository
{
    Task<UserLike?> GetUserLike(int sourceUserId, int targetUserId);

    Task<PagedList<MemberDto>> GetUserLikes(LikesParams likesParams);

    Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentUserId); //ova ni treba za da pokazheme koi gi ima liked current user 
    //za da mozhe na client da se glea na kogo ima mavnato like

    void DeleteLike(UserLike like);
    void AddLike(UserLike like);
    Task<bool> SaveChanges();
}
