<?php

  class Config {
    private $dbSettings;
    private $errorSettings;

    public function __construct() {
      $this->dbSettings = [
        'dbname' => 'slimphp',
        'user' => 'danoman',
        'password'=> 'password',
        'host'=> 'mysql',
        'driver' => 'pdo_mysql'
      ];
    }

    public function getDbConfig() {
      return $this->dbSettings;
    }

  }

