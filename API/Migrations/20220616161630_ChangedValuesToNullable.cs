using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class ChangedValuesToNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LabExaminations_LabSupervisor_LabSupervisorId",
                table: "LabExaminations");

            migrationBuilder.DropForeignKey(
                name: "FK_LabExaminations_LabTechnician_LabTechnicianId",
                table: "LabExaminations");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "LabExaminations",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "LabTechnicianId",
                table: "LabExaminations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "LabSupervisorId",
                table: "LabExaminations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_LabExaminations_LabSupervisor_LabSupervisorId",
                table: "LabExaminations",
                column: "LabSupervisorId",
                principalTable: "LabSupervisor",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LabExaminations_LabTechnician_LabTechnicianId",
                table: "LabExaminations",
                column: "LabTechnicianId",
                principalTable: "LabTechnician",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LabExaminations_LabSupervisor_LabSupervisorId",
                table: "LabExaminations");

            migrationBuilder.DropForeignKey(
                name: "FK_LabExaminations_LabTechnician_LabTechnicianId",
                table: "LabExaminations");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "LabExaminations",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "LabTechnicianId",
                table: "LabExaminations",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "LabSupervisorId",
                table: "LabExaminations",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_LabExaminations_LabSupervisor_LabSupervisorId",
                table: "LabExaminations",
                column: "LabSupervisorId",
                principalTable: "LabSupervisor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LabExaminations_LabTechnician_LabTechnicianId",
                table: "LabExaminations",
                column: "LabTechnicianId",
                principalTable: "LabTechnician",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
