<?php

class AuthorController extends Zend_Controller_Action {

public function init() {
/* Initialize action controller here */
}

public function authorAction() {
$author = new Application_Model_DbTable_Authors(); 
$this -> view -> author = $author -> fetchAll(); 
}

public function addAction() {


$this -> _helper -> layout() -> disableLayout(); 

if ($this -> getRequest() -> isPost()) {
$formData = $this -> getRequest() -> getPost(); 

$name       = $this -> getRequest() -> getPost('name'); 
$email      = $this -> getRequest() -> getPost('email'); 
$phone      = $this -> getRequest() -> getPost('phone'); 
$address    = $this -> getRequest() -> getPost('address'); 

$authors = new Application_Model_DbTable_Authors(); 
$authors -> addAuthor($name, $email, $phone, $address); 

}
}

public function editAction() {

$this -> _helper -> layout() -> disableLayout(); 
if ($this -> getRequest() -> isPost()) {
$formData = $this -> getRequest() -> getPost(); 

$id         = (int)$this -> getRequest() -> getPost('id'); 
$name       = $this -> getRequest() -> getPost('name'); 
$email      = $this -> getRequest() -> getPost('email'); 
$phone      = $this -> getRequest() -> getPost('phone'); 
$address    = $this -> getRequest() -> getPost('address'); 

$authors = new Application_Model_DbTable_Authors(); 
$authors -> updateAuthor($id, $name, $email, $phone, $address); 

}
}

public function deleteAction() {

$this -> _helper -> layout() -> disableLayout(); 
if ($this -> getRequest() -> isPost()) {

$del    = $this -> getRequest() -> getPost('del'); 
$id     = $this -> getRequest() -> getPost('id'); 

$authors = new Application_Model_DbTable_Authors(); 
$authors -> deleteAuthor($id); 

$this -> _helper -> redirector('author'); 
}else {
$id = $this -> _getParam('id', 0); 
$authors = new Application_Model_DbTable_Authors(); 
$this -> view -> author = $authors -> getAuthor($id); 
}
}

public function authorjsonAction() {

    
$this -> _helper -> layout() -> disableLayout(); 

$this -> _helper -> viewRenderer -> setNoRender(true); 
$author = new Application_Model_DbTable_Authors(); 


$colums = array(
0 => 'name', 
1 => 'email', ); 

$query = $author -> select() -> where('name LIKE ?', $this -> getRequest() -> get('search')['value'] . '%'); 

if ( ! empty($this -> getRequest() -> get('search')['value'])) {

$row = $author -> fetchAll($query); 

$totalRecords = count($row); 
}else {

$row = $author -> fetchAll($where = null, $order = $colums[$this -> getRequest() -> get('order')[0]['column']] . " " . $this -> getRequest() -> get('order')[0]['dir'], $count = $this -> getRequest() -> get('length'), $offset = $this -> getRequest() -> get('start')); 
$row2 = $author -> fetchAll($where = null); 

$totalRecords = count($row2); 
$totalRecords; 
}

$json_data = array(
"draw" => intval($this -> getRequest() -> get('draw')), 
"recordsTotal" => intval($totalRecords), 
"recordsFiltered" => intval($totalRecords), 
"data" => $row -> toArray(), ); 

echo json_encode($json_data); 

}

}
