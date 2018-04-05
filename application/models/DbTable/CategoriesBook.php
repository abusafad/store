<?php
class Application_Model_DbTable_CategoriesBook extends Zend_Db_Table_Abstract
{
protected $_name = 'categories_book';

	public function getCategoriesBook($id)
{
	$id = (int)$id;
	$row = $this->fetchRow('idbook = ' . $id);
	if (!$row) 
	{
	throw new Exception("Could not find row $id");
	}
	return $row->toArray();
}
	
	
	
	
public function addCategoriesBook($idbookcat, $idcategories , $count)
{
	for($i=0;$i<$count;$i++)
	    {
		$data = array ('idbook'=>$idbookcat ,'idcategories'=>$idcategories[$i]);
		$this->insert($data);
		}
//	$data = array(
//	'idbook'  => $idbookcat,
//	'idcategories' => $idcategories,
//	);
//	$this->insert($data);
}
	
	
public function deleteCategoriesBook($idbook)
{
	$this->delete('idbook = '. $idbook);
}
	
	
}