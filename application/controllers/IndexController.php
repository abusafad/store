<?php

class IndexController extends Zend_Controller_Action {

public function init() {
/* Initialize action controller here */
}

function indexAction() {
$index = new Application_Model_DbTable_Index(); 
$this -> view -> index = $index -> fetchAll(); 

}


public function indexjsonAction() {


$this -> _helper -> layout() -> disableLayout(); 
$this -> _helper -> viewRenderer -> setNoRender(true); 
$index = new Application_Model_DbTable_Index(); 

$colums = array(
0 => 'bookname', 
1 => 'name', 
2 => 'phone', 

); 


$query = $index -> select() -> where('bookname LIKE ?', $this -> getRequest() -> get('search')['value'] . '%'); 



if ( ! empty($this -> getRequest() -> get('search')['value'])) {

$row = $index -> fetchAll($query); 

$totalRecords = count($row); 

}



else {

$row = $index -> fetchAll($where = null, $order = $colums[$this -> getRequest() -> get('order')[0]['column']] . " " . $this -> getRequest() -> get('order')[0]['dir'], $count = $this -> getRequest() -> get('length'), $offset = $this -> getRequest() -> get('start')); 
$row2 = $index -> fetchAll($where = null); 


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







