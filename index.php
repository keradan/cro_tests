<?php



$tests_details = [
	'0b8b29cac0168eab2b3db4f804cb00d7' => (object)[
		'name' => 'Сheckout: trust blocks (Desktop)',
		'go_link' => 'https://optimize.google.com/optimize/home/?authuser=2&hl=en-US#/accounts/1641156638/containers/7279625/experiments/439',
		'tech_specs_link' => 'https://docs.google.com/spreadsheets/d/1Fbdw6XDosSjhlXl5rIN8w2qK9Bqr0GgNGenYwp1F5QE/edit#gid=1984207254',
		'design_link' => 'https://www.figma.com/file/uLG8jcJ29iC6p2PcftCgKG/Depositphotos?node-id=0%3A1',
		'asana_link' => 'https://app.asana.com/0/1163680999024242/1195056393000827/f',
	],
];
$black_list = [
	'.',
	'..',
	'.DS_Store',
    '.git',
    '.gitignore',
    'default',
    'index.md',
    'index.php',
];
$tree = [];
foreach (scandir(__DIR__) as $dir_name) {
	if (in_array($dir_name, $black_list)) continue;
	$files_names = array_filter(array_map(function($item) use ($black_list) {
		if (strpos($item, '.js') === false) return null;
		if (in_array($item, $black_list)) return null;
		return str_replace('.js', null, $item);
	}, scandir(__DIR__ . '/' . $dir_name)));
	$tree[] = (object)[
		'name' => $dir_name,
		'files' => array_map(function($file_name) use($dir_name, $tests_details) {
			$hash = md5($dir_name . $file_name);
			$details = $tests_details[$hash] ?? null;
			return (object)[
				'name' => $file_name,
				'hash' => $hash,
				'details' => $details,
			];
		}, $files_names),
	];
}
echo "<pre>";
print_r($tree);

?>

<?php /*

<table>
	<thead>
		<tr>
			<td>#</td>
			<td>Клиент</td>
			<td>Хэш</td>
			<td></td>
			<td>dsdsdsdjhjh</td>
			<td>dsdsdsdjhjh</td>
			<td>dsdsdsdjhjh</td>
			<td>dsdsdsdjhjh</td>
		</tr>
	</thead>
	<tbody>
		<?php foreach ($variable as $key => $value): ?>
			<tr>
				<?php foreach ($variable as $key => $value): ?>
					<td>
						djkskjsjkds
					</td>
				<?php endforeach; ?>
			</tr>
		<?php endforeach; ?>
	</tbody>
</table>

*/






