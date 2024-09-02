using System;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class PhotoRepository(DataContext context) : IPhotoRepository
{
    public async Task<Photo> GetPhotoById(int id)
    {
        var p = await context.Photos.IgnoreQueryFilters().SingleOrDefaultAsync(x => x.Id == id) ?? throw new Exception("Photo could not be found");
        return p;
    }

    public async Task<List<PhotoForApprovalDto>> GetUnapprovedPhotos()
    {
        return await context.Photos.IgnoreQueryFilters().Where(x => x.IsApproved == false)
            .Select(x => new PhotoForApprovalDto{
                Id = x.Id,
                Username = x.AppUser.UserName,
                Url = x.Url,
                IsApproved = x.IsApproved
            }).ToListAsync();
    }

    public void RemovePhoto(Photo photo)
    {
        context.Photos.Remove(photo);
    }
}
