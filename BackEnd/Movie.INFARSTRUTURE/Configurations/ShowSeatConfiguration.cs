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
    public class ShowSeatConfiguration : IEntityTypeConfiguration<ShowSeat>
    {
        public void Configure(EntityTypeBuilder<ShowSeat> builder)
        {
            builder.ToTable("ShowSeat");
            builder.HasKey(e => e.ShowSeatID);
            builder.Property(e => e.ShowSeatID).IsRequired();
            builder.Property(e => e.ShowID).IsRequired();
            builder.Property(e => e.SeatID).IsRequired();
           
            builder.HasOne(e => e.Seat).WithMany(e => e.ShowSeat).HasForeignKey(e => e.SeatID).OnDelete(DeleteBehavior.Restrict); ;
            builder.HasOne(e => e.Show).WithMany(e => e.ShowSeat).HasForeignKey(e => e.ShowID).OnDelete(DeleteBehavior.Restrict); ;
        }

    }
}
