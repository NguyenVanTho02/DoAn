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
    public class MovieConfiguration: IEntityTypeConfiguration<Entities.Movie>
    {
        public void Configure(EntityTypeBuilder<Entities.Movie> builder)
        {
            builder.ToTable("Movies");
            builder.HasKey(e => e.MovieID);
            builder.Property(e => e.MovieName)
                .IsRequired()
                .HasMaxLength(250);
            builder.Property(e => e.ReleaseDate)
                .IsRequired();
            builder.Property(e => e.Duration)
                .IsRequired();
            builder.HasOne(e => e.Genre).WithMany(e => e.Movie).HasForeignKey(e => e.GenreID);
        }
    }
}
