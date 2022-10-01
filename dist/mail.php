<?php
  $name = $_POST['name'];
  $email = $_POST['email'];
  $text = $_POST['message'];

  $to = "mr.nonamerz08@yandex.ru";
  $subject = "Отклик на портфолио";
  $message = "Имя: " . $name . "\n Email: " . $email . "\n Сообщение: " . $text . " ";
  mail ($to, $subject, $message);
  header("Location: https://isakov.pro");
?>