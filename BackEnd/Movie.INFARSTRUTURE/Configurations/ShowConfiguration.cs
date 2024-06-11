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
    public class ShowConfiguration : IEntityTypeConfiguration<Show>
    {
        public void Configure(EntityTypeBuilder<Show> builder)
        {
            builder.ToTable("Shows");
            builder.HasKey(e => e.ShowID);
            builder.Property(e => e.ShowID).IsRequired();
            builder.Property(e => e.ShowDate).IsRequired();
            builder.Property(e => e.MovieID).IsRequired();
            builder.HasOne(e => e.Movie).WithMany(e => e.Show).HasForeignKey(e => e.MovieID);
            builder.HasOne(e => e.Theater).WithMany(e => e.Show).HasForeignKey(e => e.TheaterID);
        }
    }
}
