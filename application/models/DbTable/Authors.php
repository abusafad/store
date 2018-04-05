<?php
class Application_Model_DbTable_Authors extends Zend_Db_Table_Abstract
{
protected $_name = 'author';
	
public function getAuthor($id)
{
	$id = (int)$id;
	$row = $this->fetchRow('id = ' . $id);
	
	if (!$row) 
	{
	throw new Exception("Could not find row $id");
	}
	return $row->toArray();
}
	
	
public function addAuthor($name, $email , $phone , $address)
{
	$data = array(
	'name' => $name,
	'email' => $email,
	'phone' => $phone,
	'address' => $address,
	);
	$this->insert($data);
}
	
public function updateAuthor($id, $name, $email , $phone , $address)
{
	$data = array(
	'name' => $name,
	'email' => $email,
	'phone' => $phone,
	'address' => $address,
	);
	$this->update($data, 'id = '. (int)$id);
}
	
public function deleteAuthor($id)
{
	$this->delete('id =' . (int)$id);
}
	
	
}