﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API.Entities.Doctor", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Npwz")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Doctors");
                });

            modelBuilder.Entity("API.Entities.ExaminationList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Icd")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("ExaminationLists");
                });

            modelBuilder.Entity("API.Entities.LabExamination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("DoctorNotes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ExaminationListId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ExecutionDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("LabNotes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LabSupervisorId")
                        .HasColumnType("int");

                    b.Property<int>("LabTechnicianId")
                        .HasColumnType("int");

                    b.Property<string>("LabTestStatus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VisitsId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ExaminationListId");

                    b.HasIndex("LabSupervisorId");

                    b.HasIndex("LabTechnicianId");

                    b.HasIndex("VisitsId");

                    b.ToTable("LabExaminations");
                });

            modelBuilder.Entity("API.Entities.LabSupervisor", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LabSupervisor");
                });

            modelBuilder.Entity("API.Entities.LabTechnician", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LabTechnician");
                });

            modelBuilder.Entity("API.Entities.Patient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pesel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("API.Entities.PhysicalExamination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("ExaminationListId")
                        .HasColumnType("int");

                    b.Property<string>("Results")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VisitsId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ExaminationListId");

                    b.HasIndex("VisitsId");

                    b.ToTable("PhysicalExaminations");
                });

            modelBuilder.Entity("API.Entities.Registrant", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Registrants");
                });

            modelBuilder.Entity("API.Entities.Visits", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Diagnosis")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DoctorId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FinalizationTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.Property<int>("RegistrantId")
                        .HasColumnType("int");

                    b.Property<DateTime>("RegistrationTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeSpan>("VisitTime")
                        .HasColumnType("time");

                    b.HasKey("Id");

                    b.HasIndex("DoctorId");

                    b.HasIndex("PatientId");

                    b.HasIndex("RegistrantId");

                    b.ToTable("Visits");
                });

            modelBuilder.Entity("API.Entities.Whitelist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Ip")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsEnabled")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("IPWhitelist");
                });

            modelBuilder.Entity("API.Entities.Doctor", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithOne("Doctor")
                        .HasForeignKey("API.Entities.Doctor", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.LabExamination", b =>
                {
                    b.HasOne("API.Entities.ExaminationList", "ExaminationList")
                        .WithMany("LabExaminations")
                        .HasForeignKey("ExaminationListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.LabSupervisor", "LabSupervisor")
                        .WithMany("LabExaminations")
                        .HasForeignKey("LabSupervisorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.LabTechnician", "LabTechnician")
                        .WithMany("LabExaminations")
                        .HasForeignKey("LabTechnicianId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Visits", "Visits")
                        .WithMany("LabExaminations")
                        .HasForeignKey("VisitsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ExaminationList");

                    b.Navigation("LabSupervisor");

                    b.Navigation("LabTechnician");

                    b.Navigation("Visits");
                });

            modelBuilder.Entity("API.Entities.LabSupervisor", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithOne("LabSupervisor")
                        .HasForeignKey("API.Entities.LabSupervisor", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.LabTechnician", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithOne("LabTechnician")
                        .HasForeignKey("API.Entities.LabTechnician", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.PhysicalExamination", b =>
                {
                    b.HasOne("API.Entities.ExaminationList", "ExaminationLists")
                        .WithMany("PhysicalExaminations")
                        .HasForeignKey("ExaminationListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Visits", "Visits")
                        .WithMany("PhysicalExaminations")
                        .HasForeignKey("VisitsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ExaminationLists");

                    b.Navigation("Visits");
                });

            modelBuilder.Entity("API.Entities.Registrant", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithOne("Registrant")
                        .HasForeignKey("API.Entities.Registrant", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.Visits", b =>
                {
                    b.HasOne("API.Entities.Doctor", "Doctor")
                        .WithMany("Visits")
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Patient", "Patient")
                        .WithMany("Visits")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Registrant", "Registrant")
                        .WithMany("Visits")
                        .HasForeignKey("RegistrantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Doctor");

                    b.Navigation("Patient");

                    b.Navigation("Registrant");
                });

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Navigation("Doctor");

                    b.Navigation("LabSupervisor");

                    b.Navigation("LabTechnician");

                    b.Navigation("Registrant");
                });

            modelBuilder.Entity("API.Entities.Doctor", b =>
                {
                    b.Navigation("Visits");
                });

            modelBuilder.Entity("API.Entities.ExaminationList", b =>
                {
                    b.Navigation("LabExaminations");

                    b.Navigation("PhysicalExaminations");
                });

            modelBuilder.Entity("API.Entities.LabSupervisor", b =>
                {
                    b.Navigation("LabExaminations");
                });

            modelBuilder.Entity("API.Entities.LabTechnician", b =>
                {
                    b.Navigation("LabExaminations");
                });

            modelBuilder.Entity("API.Entities.Patient", b =>
                {
                    b.Navigation("Visits");
                });

            modelBuilder.Entity("API.Entities.Registrant", b =>
                {
                    b.Navigation("Visits");
                });

            modelBuilder.Entity("API.Entities.Visits", b =>
                {
                    b.Navigation("LabExaminations");

                    b.Navigation("PhysicalExaminations");
                });
#pragma warning restore 612, 618
        }
    }
}
