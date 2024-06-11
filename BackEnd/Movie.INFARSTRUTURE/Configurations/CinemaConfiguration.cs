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
    public class CinemaConfiguration: IEntityTypeConfiguration<Cinema>
    {
        public void Configure(EntityTypeBuilder<Cinema> builder)
        {
            builder.ToTable("Cinemas");
            builder.HasKey(e => e.CinemaID);
            builder.Property(e => e.CinemaID).IsRequired();
            builder.Property(e => e.CinemaName).IsRequired();
            builder.HasOne(e => e.City).WithMany(e => e.Cinema).HasForeignKey(e => e.CityID);
        }
    }
}
