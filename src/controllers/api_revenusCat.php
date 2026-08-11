<?php
require_once "./acces.php";

require_once "../models/Select.php";




$categories = getRevenueByCategories();
echo  $categories ? json_encode($categories) : json_encode(["message" => false]);
