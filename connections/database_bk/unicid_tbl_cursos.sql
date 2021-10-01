-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: unicid
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_cursos`
--

DROP TABLE IF EXISTS `tbl_cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_curso` varchar(150) NOT NULL,
  `curso` varchar(150) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `dt_cadastro` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cursos`
--

LOCK TABLES `tbl_cursos` WRITE;
/*!40000 ALTER TABLE `tbl_cursos` DISABLE KEYS */;
INSERT INTO `tbl_cursos` VALUES (1,'SUPERIOR','Ciência da Computação – Bacharelado',1,'2021-09-25 02:14:45'),(2,'SUPERIOR','Ciência da Computação – Licenciatura',1,'2021-09-25 02:14:45'),(3,'SUPERIOR','Computação',1,'2021-09-25 02:14:45'),(4,'SUPERIOR','Engenharia de Computação',1,'2021-09-25 02:14:45'),(5,'SUPERIOR','Sistema de Informação',1,'2021-09-25 02:14:45'),(6,'TECNOLOGO','Tecnologia em Análise e Desenvolvimento de Sistemas',1,'2021-09-25 02:14:45'),(7,'TECNOLOGO','Tecnologia em Redes de Computadores',1,'2021-09-25 02:14:45'),(8,'SUPERIOR','Analise',0,'2021-09-25 04:30:42'),(9,'SUPERIOR','Analise',0,'2021-09-25 04:31:32'),(10,'TECNOLOGO','Engenharia',0,'2021-09-25 04:34:34'),(11,'TECNOLOGO','Engenharia',0,'2021-09-25 04:35:16'),(12,'TESTE','Teste',0,'2021-09-25 05:04:05');
/*!40000 ALTER TABLE `tbl_cursos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-25  2:51:19
