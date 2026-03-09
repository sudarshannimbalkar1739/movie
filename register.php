<?php
session_start();
include "db.php";

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['registerPassword'];
$phone = $_POST['phone'];
$address = $_POST['address'];


if (isset($_POST['register'])) {
  if ($_POST['registerPassword'] !== $_POST['reenterregisterPassword']) {
    echo "<script>alert('Password Not Matched');window.location='index.php';</script>";
    exit;
  } else {
    $check_email = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");
    if (mysqli_num_rows($check_email) > 0) {
      echo "<script>alert('Email already exists');</script>";
      die("<script>location='index.php';</script>");
    }
    $pass = ($_POST['registerPassword']);
    mysqli_query($conn, "INSERT INTO users(username,phone,address,email,password)
  VALUES(
    '$username',
    '$phone',
    '$address',
    '$email',
    '$pass'
  )");
    echo "<script>alert('Registration Successful');</script>";
  }
}

$sql = "SELECT * FROM users WHERE email='$email' AND password='$pass'";
$result = mysqli_query($conn, $sql);

if (!$result) {
  die("Query Failed: " . mysqli_error($conn));
}

if (mysqli_num_rows($result) == 1) {
  $row = mysqli_fetch_assoc($result);
  $_SESSION['users_id'] = $row['users_id'];
  $_SESSION['username'] = $row['username'];
  header("Location: index.php");
  exit();
} else {
  echo "<script>window.alert('invalid Login');</script>";
  echo "<script>window.location.href = 'index.php'</script>;";
}
