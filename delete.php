<?php
include 'db.php';

if (isset($_POST['submit'])) {
    $table = $_POST['table_nm'];
    $col_nm = $_POST['col_nm'];
    $id = $_POST['id'];


    echo "Table: $table, Column: $col_nm, ID: $id"; // Debugging output


    if (empty($table) || empty($col_nm) || empty($id)) {
        echo "<script>alert('Invalid request');window.location='admindash.php';</script>";
        exit;
    }

    $sql = "DELETE FROM `$table` WHERE $col_nm = '$id'";
    mysqli_query($conn, $sql);
    echo "<script>alert('Item deleted successfully');window.location='admindash.php';</script>";
}
if (!$sql) {
    echo "<script>alert('Error deleting item');window.location='admindash.php';</script>";
    die("Query Failed: " . mysqli_error($conn));
}
