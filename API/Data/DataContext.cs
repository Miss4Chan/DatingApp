using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; } //vaka ke se vika tabelata 
    public DbSet<UserLike> Likes { get; set; }
    public DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //TODO: ne e ova todo samo mi treba da sveti deka se posebni sections gornovo e za likes 

        modelBuilder.Entity<UserLike>().HasKey(k => new { k.SourceUserId, k.TargetUserId });
        //so ova praime compostie key od idnjata na dvata users 

        modelBuilder.Entity<UserLike>().HasOne(s => s.SourceUser)
        .WithMany(l => l.LikedUsers).HasForeignKey(s => s.SourceUserId).OnDelete(DeleteBehavior.Cascade);
        //eden userlike ima eden source user ama mozhe da ima povekje target u sluchajov listata likedusers

        modelBuilder.Entity<UserLike>().HasOne(s => s.TargetUser)
        .WithMany(l => l.LikedByUsers).HasForeignKey(s => s.TargetUserId).OnDelete(DeleteBehavior.Cascade);

        //TODO: lol read the previous one

        modelBuilder.Entity<Message>().HasOne(x => x.Recipient).WithMany(x => x.MessagesReceived).OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<Message>().HasOne(x => x.Sender).WithMany(x => x.MessagesSent).OnDelete(DeleteBehavior.Restrict);
    }
}
