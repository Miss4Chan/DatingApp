using System;
using API.DTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;



//We will use repository to create a layer of abstraction and encapsulate the logic and provide only the ones we may need
//A controller will inject a repo and only have access to those methods
//It also reduces duplicate queries in varios places by providing a method 
public interface IUserRepository
{
    void Update(AppUser user);
    Task<Boolean> SaveAllAsync();
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser?> GetUserByIdAsync(int id); //make them optional since they can return null
    Task<AppUser?> GetUserByUsernameAsync(string username);

    Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
    Task<MemberDto?> GetMemberAsync(string username);
}
