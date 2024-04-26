<?php

use Doctrine\DBAL\DriverManager as DriverManager;

class DB
{
  private $qb;
  private $conn;
  private $connetionParams;


  public function __construct(Config $config)
  {

    $this->connetionParams = $config->getDbConfig();

    $this->conn = DriverManager::getConnection($this->connetionParams);

    $this->qb = $this->conn->createQueryBuilder();

  }

  public function getQueryBuilder()
  {

    return $this->qb;

  }

}