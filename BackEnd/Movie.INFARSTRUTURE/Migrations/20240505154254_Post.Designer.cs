﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Movie.INFARSTRUTURE;

#nullable disable

namespace Movie.INFARSTRUTURE.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240505154254_Post")]
    partial class Post
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.26")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("Roles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("UserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("UserTokens", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime?>("Birthday")
                        .HasColumnType("datetime2");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Booking", b =>
                {
                    b.Property<int>("BookingID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BookingID"), 1L, 1);

                    b.Property<DateTime>("BookingDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("PaymentID")
                        .HasColumnType("int");

                    b.Property<int>("ShowSeatID")
                        .HasColumnType("int");

                    b.Property<int>("TotalPrice")
                        .HasColumnType("int");

                    b.HasKey("BookingID");

                    b.HasIndex("PaymentID");

                    b.HasIndex("ShowSeatID")
                        .IsUnique();

                    b.ToTable("Bookings", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Cinema", b =>
                {
                    b.Property<int>("CinemaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CinemaID"), 1L, 1);

                    b.Property<string>("CinemaAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CinemaName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CityID")
                        .HasColumnType("int");

                    b.HasKey("CinemaID");

                    b.HasIndex("CityID");

                    b.ToTable("Cinemas", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.City", b =>
                {
                    b.Property<int>("CityID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CityID"), 1L, 1);

                    b.Property<string>("CityName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CityID");

                    b.ToTable("Cities", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Feedback", b =>
                {
                    b.Property<int>("FeedbackID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("FeedbackID"), 1L, 1);

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateFeedback")
                        .HasColumnType("datetime2");

                    b.Property<int>("MovieID")
                        .HasColumnType("int");

                    b.Property<int>("Rate")
                        .HasColumnType("int");

                    b.HasKey("FeedbackID");

                    b.HasIndex("MovieID");

                    b.ToTable("Feedbacks", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Genre", b =>
                {
                    b.Property<int>("GenreID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GenreID"), 1L, 1);

                    b.Property<string>("GenreName")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("GenreID");

                    b.ToTable("Genre", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Movie", b =>
                {
                    b.Property<int>("MovieID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MovieID"), 1L, 1);

                    b.Property<string>("Actors")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<bool>("CommingSoon")
                        .HasColumnType("bit");

                    b.Property<string>("Directors")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<int>("GenreID")
                        .HasColumnType("int");

                    b.Property<bool>("Hot")
                        .HasColumnType("bit");

                    b.Property<string>("Images")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MovieName")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Poster")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ReleaseDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("ShowNow")
                        .HasColumnType("bit");

                    b.Property<string>("Summary")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Trailer")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MovieID");

                    b.HasIndex("GenreID");

                    b.ToTable("Movies", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Payment", b =>
                {
                    b.Property<int>("PaymentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PaymentID"), 1L, 1);

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfTicket")
                        .HasColumnType("int");

                    b.Property<DateTime>("PaymentDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("PaymentInfo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentMethod")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentStatus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ShowID")
                        .HasColumnType("int");

                    b.Property<string>("TransactionID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("PaymentID");

                    b.HasIndex("ShowID");

                    b.HasIndex("UserID");

                    b.ToTable("Payments", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Post", b =>
                {
                    b.Property<int>("PostID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PostID"), 1L, 1);

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImagePoster")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("PostID");

                    b.HasIndex("UserID");

                    b.ToTable("Post", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Seat", b =>
                {
                    b.Property<int>("SeatID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SeatID"), 1L, 1);

                    b.Property<string>("SeatName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SeatType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TheaterID")
                        .HasColumnType("int");

                    b.HasKey("SeatID");

                    b.HasIndex("TheaterID");

                    b.ToTable("Seats", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Show", b =>
                {
                    b.Property<int>("ShowID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ShowID"), 1L, 1);

                    b.Property<string>("EndTime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MovieID")
                        .HasColumnType("int");

                    b.Property<DateTime>("ShowDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("StartTime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TheaterID")
                        .HasColumnType("int");

                    b.HasKey("ShowID");

                    b.HasIndex("MovieID");

                    b.HasIndex("TheaterID");

                    b.ToTable("Shows", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.ShowSeat", b =>
                {
                    b.Property<int>("ShowSeatID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ShowSeatID"), 1L, 1);

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<int>("SeatID")
                        .HasColumnType("int");

                    b.Property<int>("SeatStatus")
                        .HasColumnType("int");

                    b.Property<int>("ShowID")
                        .HasColumnType("int");

                    b.HasKey("ShowSeatID");

                    b.HasIndex("SeatID");

                    b.HasIndex("ShowID");

                    b.ToTable("ShowSeat", (string)null);
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Theater", b =>
                {
                    b.Property<int>("TheaterID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TheaterID"), 1L, 1);

                    b.Property<int>("CinemaID")
                        .HasColumnType("int");

                    b.Property<int>("QtySeat")
                        .HasColumnType("int");

                    b.Property<string>("TheaterName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TheaterID");

                    b.HasIndex("CinemaID");

                    b.ToTable("Theaters", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Movie.INFARSTRUTURE.Entities.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Booking", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.Payment", "Payment")
                        .WithMany("Booking")
                        .HasForeignKey("PaymentID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Movie.INFARSTRUTURE.Entities.ShowSeat", "ShowSeat")
                        .WithOne("Booking")
                        .HasForeignKey("Movie.INFARSTRUTURE.Entities.Booking", "ShowSeatID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Payment");

                    b.Navigation("ShowSeat");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Cinema", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.City", "City")
                        .WithMany("Cinema")
                        .HasForeignKey("CityID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("City");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Feedback", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.Movie", "Movie")
                        .WithMany("Feedback")
                        .HasForeignKey("MovieID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Movie", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.Genre", "Genre")
                        .WithMany("Movie")
                        .HasForeignKey("GenreID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Genre");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Payment", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.Show", "Show")
                        .WithMany("Payment")
                        .HasForeignKey("ShowID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Movie.INFARSTRUTURE.Entities.ApplicationUser", "User")
                        .WithMany("Payment")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Show");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Post", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.ApplicationUser", "User")
                        .WithMany("Post")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Seat", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.Theater", "Theater")
                        .WithMany("Seat")
                        .HasForeignKey("TheaterID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Theater");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Show", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.Movie", "Movie")
                        .WithMany("Show")
                        .HasForeignKey("MovieID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Movie.INFARSTRUTURE.Entities.Theater", "Theater")
                        .WithMany("Show")
                        .HasForeignKey("TheaterID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Movie");

                    b.Navigation("Theater");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.ShowSeat", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.Seat", "Seat")
                        .WithMany("ShowSeat")
                        .HasForeignKey("SeatID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Movie.INFARSTRUTURE.Entities.Show", "Show")
                        .WithMany("ShowSeat")
                        .HasForeignKey("ShowID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Seat");

                    b.Navigation("Show");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Theater", b =>
                {
                    b.HasOne("Movie.INFARSTRUTURE.Entities.Cinema", "Cinema")
                        .WithMany("Theater")
                        .HasForeignKey("CinemaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cinema");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.ApplicationUser", b =>
                {
                    b.Navigation("Payment");

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Cinema", b =>
                {
                    b.Navigation("Theater");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.City", b =>
                {
                    b.Navigation("Cinema");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Genre", b =>
                {
                    b.Navigation("Movie");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Movie", b =>
                {
                    b.Navigation("Feedback");

                    b.Navigation("Show");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Payment", b =>
                {
                    b.Navigation("Booking");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Seat", b =>
                {
                    b.Navigation("ShowSeat");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Show", b =>
                {
                    b.Navigation("Payment");

                    b.Navigation("ShowSeat");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.ShowSeat", b =>
                {
                    b.Navigation("Booking");
                });

            modelBuilder.Entity("Movie.INFARSTRUTURE.Entities.Theater", b =>
                {
                    b.Navigation("Seat");

                    b.Navigation("Show");
                });
#pragma warning restore 612, 618
        }
    }
}