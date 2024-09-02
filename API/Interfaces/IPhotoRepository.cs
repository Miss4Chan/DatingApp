using System;
using API.DTO;
using API.Entities;

namespace API.Interfaces;

public interface IPhotoRepository
{
    Task<List<PhotoForApprovalDto>> GetUnapprovedPhotos();
    Task<Photo> GetPhotoById(int id);
    void RemovePhoto(Photo photo);
}
