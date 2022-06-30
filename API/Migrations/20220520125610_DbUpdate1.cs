using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class DbUpdate1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExaminationLists_ExaminationTypes_ExaminationTypesId",
                table: "ExaminationLists");

            migrationBuilder.DropTable(
                name: "ExaminationTypes");

            migrationBuilder.DropIndex(
                name: "IX_ExaminationLists_ExaminationTypesId",
                table: "ExaminationLists");

            migrationBuilder.RenameColumn(
                name: "Time",
                table: "Visits",
                newName: "VisitTime");

            migrationBuilder.RenameColumn(
                name: "RegistrationDay",
                table: "Visits",
                newName: "RegistrationTime");

            migrationBuilder.RenameColumn(
                name: "FinalizationDay",
                table: "Visits",
                newName: "FinalizationTime");

            migrationBuilder.RenameColumn(
                name: "ExaminationTypesId",
                table: "ExaminationLists",
                newName: "Type");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Pesel",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Icd",
                table: "ExaminationLists",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Npwz",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "IPWhitelist",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ip = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsEnabled = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IPWhitelist", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IPWhitelist");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Pesel",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Icd",
                table: "ExaminationLists");

            migrationBuilder.DropColumn(
                name: "Npwz",
                table: "Doctors");

            migrationBuilder.RenameColumn(
                name: "VisitTime",
                table: "Visits",
                newName: "Time");

            migrationBuilder.RenameColumn(
                name: "RegistrationTime",
                table: "Visits",
                newName: "RegistrationDay");

            migrationBuilder.RenameColumn(
                name: "FinalizationTime",
                table: "Visits",
                newName: "FinalizationDay");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "ExaminationLists",
                newName: "ExaminationTypesId");

            migrationBuilder.CreateTable(
                name: "ExaminationTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExaminationTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationLists_ExaminationTypesId",
                table: "ExaminationLists",
                column: "ExaminationTypesId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExaminationLists_ExaminationTypes_ExaminationTypesId",
                table: "ExaminationLists",
                column: "ExaminationTypesId",
                principalTable: "ExaminationTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
