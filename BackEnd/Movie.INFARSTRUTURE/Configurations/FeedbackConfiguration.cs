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
    public class FeedbackConfiguration : IEntityTypeConfiguration<Feedback>
    {
        public void Configure(EntityTypeBuilder<Feedback> builder)
        {
            builder.ToTable("Feedbacks");
            builder.HasKey(e => e.FeedbackID);
            builder.Property(e => e.FeedbackID).IsRequired();
            builder.HasOne(e => e.User).WithMany(e => e.Feedback).HasForeignKey(e => e.UserID);
            builder.HasOne(e => e.Movie).WithMany(e => e.Feedback).HasForeignKey(e => e.MovieID);
        }
    }
}
