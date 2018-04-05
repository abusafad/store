<?php
class Application_Model_DbTable_Books extends Zend_Db_Table_Abstract
{
protected $_name = 'books';
	
public function getBook($id)
{
	$id = (int)$id;
	$row = $this->fetchRow('id = ' . $id);
	if (!$row) 
	{
	throw new Exception("Could not find row $id");
	}
	return $row->toArray();
}
	
	
public function addBook($name, $descrabtion , $authorName , $priceJod ,$priceUsd ,$priceEru,$startDate,$endDate)
{
	$data = array
	(
	'name'           => $name,
	'descrabtion'    => $descrabtion,
	'authorid'       => $authorName,
	'priceJod'       =>$priceJod,
	'priceUsd'       =>$priceUsd,
	'priceEru'       =>$priceEru,
	'startDate'      =>$startDate,
	'endDate'        =>$endDate,
	);
	$this->insert($data);
}
	
public function updateBook($id,$name, $authorName , $descrabtion ,$priceJod ,$priceUsd ,$priceEru,$startDate,$endDate )
{
	$data = array(
	'name'          => $name,
	'descrabtion'   => $descrabtion,
	'authorid'      => $authorName,
	'priceJod'      =>$priceJod,
	'priceUsd'      =>$priceUsd,
	'priceEru'      =>$priceEru,
    'startDate'     =>$startDate,
	'endDate'     =>$endDate,
	);
	$this->update($data, 'id = '. (int)$id);
}
	
public function deleteBook($id)
{
	$this->delete('id =' . (int)$id);
}	
	
}
	