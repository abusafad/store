<?php

class BookController extends Zend_Controller_Action {

public function init() {
/* Initialize action controller here */
}

public function bookAction() {
$books = new Application_Model_DbTable_Books(); 
$this -> view -> book = $books -> fetchAll(); 

$index = new Application_Model_DbTable_Index(); 
$this -> view -> index = $index -> fetchAll(); 

}

public function addAction() {

$this->_helper->layout()->disableLayout();

if ($this->getRequest()->isPost()) {
    $formData = $this->getRequest()->getPost();
    $name = $this->getRequest()->getPost('name');
    $authorName = $this->getRequest()->getPost('authorid');
    $descrabtion = $this->getRequest()->getPost('descrabtion');
    $priceJod = $this->getRequest()->getPost('priceJod');
    $priceUsd = $this->getRequest()->getPost('priceUsd');
    $priceEru = $this->getRequest()->getPost('priceEru');
    $startDate = $this->getRequest()->getPost('startDate');
    $endDate = $this->getRequest()->getPost('endDate');
    $catName = $this->getRequest()->getPost('category');

    if ($Books = new Application_Model_DbTable_Books()) {
        $Books->addBook($name, $descrabtion, $authorName, $priceJod, $priceUsd, $priceEru, $startDate, $endDate);
        $books = new Application_Model_DbTable_Books();
        $showlist = $books->fetchAll($books->select()->where('name = ?', $name));
        $count = count($this->getRequest()->getPost('category'));

        $idbookcat = $showlist[0]['id'];
        $idcategories = $this->getRequest()->getPost('category');

        $CategoriesBook = new Application_Model_DbTable_CategoriesBook();
        $CategoriesBook->addCategoriesBook($idbookcat, $idcategories, $count);

    }

}

}

public function editAction() {

$this -> _helper -> layout() -> disableLayout(); 

if ($this -> getRequest() -> isPost()) {
$formData = $this -> getRequest() -> getPost(); 

$id = (int)$this -> getRequest() -> getPost('id'); 
$name = $this -> getRequest() -> getPost('name'); 
$authorName     = $this -> getRequest() -> getPost('author'); 
$descrabtion    = $this -> getRequest() -> getPost('descrabtion'); 
$priceJod       = $this -> getRequest() -> getPost('priceJod'); 
$priceUsd       = $this -> getRequest() -> getPost('priceUsd'); 
$priceEru       = $this -> getRequest() -> getPost('priceEru'); 
$startDate      = $this -> getRequest() -> getPost('startDate'); 
$endDate        = $this -> getRequest() -> getPost('endDate'); 
$catName        = $this -> getRequest() -> getPost('category'); 

if ($books = new Application_Model_DbTable_Books()) {
$books -> updateBook($id, $name, $authorName, $descrabtion, $priceJod, $priceUsd, $priceEru, $startDate, $endDate); 
$idbook = $id; 
$CategoriesBook = new Application_Model_DbTable_CategoriesBook(); 
$CategoriesBook -> deleteCategoriesBook($idbook); 

$count = count($this -> getRequest() -> getPost('category')); 

$idbookcat = $id; 
$idcategories = $this -> getRequest() -> getPost('category'); 

$CategoriesBook = new Application_Model_DbTable_CategoriesBook(); 
$CategoriesBook -> addCategoriesBook($idbookcat, $idcategories, $count); 

}

}

}

public function deleteAction() {

$this -> _helper -> layout() -> disableLayout(); 
if ($this -> getRequest() -> isPost()) {

$id = $this -> getRequest() -> getPost('id'); 
$books = new Application_Model_DbTable_Books(); 
$books -> deleteBook($id); 

}else {
$id = $this -> _getParam('id', 0); 
$books = new Application_Model_DbTable_Books(); 
$this -> view -> book = $books -> getBook($id); 
}
}

public function bookjsonAction() {


$this -> _helper -> layout() -> disableLayout(); 
$this -> _helper -> viewRenderer -> setNoRender(true); 
$index = new Application_Model_DbTable_Index(); 

$colums = array(
0 => 'bookname', 
1 => 'name', 
2 => 'descrabtion',
3 =>  'priceJod',
4 =>  "priceUsd",
5 =>  "priceEru",
6 =>  "startDate",
7 =>  "endDate",
8 =>  'catname',
9 =>  'name',

); 


$query = $index -> select() -> where('bookname LIKE ?', $this -> getRequest() -> get('search')['value'] . '%' )
->ORwhere('name LIKE ?', $this -> getRequest() -> get('search')['value'] . '%')
->ORwhere('descrabtion LIKE ?', $this -> getRequest() -> get('search')['value'] . '%')
->ORwhere('priceJod LIKE ?', $this -> getRequest() -> get('search')['value'] . '%')
->ORwhere('priceUsd LIKE ?', $this -> getRequest() -> get('search')['value'] . '%')
->ORwhere('priceEru LIKE ?', $this -> getRequest() -> get('search')['value'] . '%')
->ORwhere('startDate LIKE ?', $this -> getRequest() -> get('search')['value'] . '%')
->ORwhere('endDate LIKE ?', $this -> getRequest() -> get('search')['value'] . '%')
->ORwhere('catname LIKE ?', $this -> getRequest() -> get('search')['value'] . '%'); 



if ( ! empty($this -> getRequest() -> get('search')['value'])) {


$row = $index -> fetchAll($query); 

$totalRecordsfilter = count($row);

$row2 = $index->fetchAll($where = null);
$totalRecords = count($row2);

$json_data = array(
    "draw" => intval($this->getRequest()->get('draw')),
    "recordsTotal" => intval($totalRecords),
    "recordsFiltered" => intval($totalRecordsfilter),
    "data" => $row->toArray());

echo json_encode($json_data);


}


else
{
$row = $index -> fetchAll($where = null, $order = $colums[$this -> getRequest() -> get('order')[0]['column']] . " " . $this -> getRequest() -> get('order')[0]['dir'], $count = $this -> getRequest() -> get('length'), $offset = $this -> getRequest() -> get('start')); 
$row2 = $index -> fetchAll($where = null); 


$totalRecords = count($row2); 

$totalRecordsfilter = $totalRecords;

$json_data = array(
    "draw" => intval($this->getRequest()->get('draw')),
    "recordsTotal" => intval($totalRecords),
    "recordsFiltered" => intval($totalRecordsfilter),
    "data" => $row->toArray());

echo json_encode($json_data);


}


}

}
