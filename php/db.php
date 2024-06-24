<?php
class Database {
    private static $instance = null;
    private $connection;
    private $host = 'localhost';
    private $username = 'username';
    private $password = 'password';
    private $database = 'EmpresaTramites';

    private function __construct() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        if ($this->connection->connect_error) {
            die('Conexión fallida: ' . $this->connection->connect_error);
        }
    }

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }

    public function closeConnection() {
        $this->connection->close();
    }
}
?>
