using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Movie.INFARSTRUTURE.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Configurations
{
    public class PostConfiguration : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> builder)
        {
            builder.ToTable("Post");
            builder.HasKey(e => e.PostID);
            builder.Property(e => e.PostID).IsRequired();
            builder.Property(e => e.Title).IsRequired();
            builder.Property(e => e.ImagePoster).IsRequired();
            builder.Property(e => e.Content).IsRequired();
            builder.HasOne(e => e.User).WithMany(e => e.Post).HasForeignKey(e => e.UserID);
        }
    }
}
