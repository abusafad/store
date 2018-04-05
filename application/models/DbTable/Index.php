<?php
class Application_Model_DbTable_Index extends Zend_Db_Table_Abstract
{
protected $_name = 'view_book_author';
protected $_primary = 'id';	
public function getIndex($id)
{
	$id = (int)$id;
	$row = $this->fetchRow('id = ' . $id);
	
	if (!$row) 
	{
	throw new Exception("Could not find row $id");
	}
	return $row->toArray();
}
}
	
	