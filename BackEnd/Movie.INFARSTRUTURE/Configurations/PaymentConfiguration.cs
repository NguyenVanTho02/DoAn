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
    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.ToTable("Payments");
            builder.HasKey(e => e.PaymentID);
            builder.Property(e => e.PaymentID).IsRequired();
            builder.HasOne(e => e.User).WithMany(e => e.Payment).HasForeignKey(e => e.UserID);
            builder.HasOne(e => e.Show).WithMany(e => e.Payment).HasForeignKey(e => e.ShowID);
        }
    }
}
