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
    public class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.ToTable("Bookings");
            builder.HasKey(e => e.BookingID);
            builder.Property(e => e.BookingID).IsRequired();
            builder.Property(e => e.TotalPrice).IsRequired();
            builder.HasOne(e => e.ShowSeat).WithOne(e => e.Booking).HasForeignKey<Booking>(e => e.ShowSeatID).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Payment).WithMany(e => e.Booking).HasForeignKey(e => e.PaymentID);
        }
    }
}
