using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("Photos")]
public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    //Navigation property 
    //Ako go ostaime sam da naprai relation ke dozvoli null vrednosti za userId 
    //This would mean deka an image can exist in the database bez da ima user associated with it
    //Also when we delete the user the images will stay 

    //Ova e required one to many relationship
    public bool IsApproved { get; set; } //photo challenge 
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
}