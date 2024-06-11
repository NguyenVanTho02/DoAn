using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Movie.INFARSTRUTURE.Entities;

namespace Movie.INFARSTRUTURE.Configurations
{
    public class TheaterConfiguration : IEntityTypeConfiguration<Theater>
    {
        public void Configure(EntityTypeBuilder<Theater> builder)
        {
            builder.ToTable("Theaters");
            builder.HasKey(e => e.TheaterID);
            builder.Property(e => e.TheaterID).IsRequired();
            builder.HasOne(e => e.Cinema).WithMany(e => e.Theater).HasForeignKey(e => e.CinemaID);
        }
    }
}
