<script>
	let silver = 9999;
	let gold = 9999;

	__ext.on('ev-update-money', (data) => 
	{
		silver = data.Silver;
		gold = data.Gold;
	});
</script>

<style>
	.property 
	{
		display: flex;
		align-items: center;
		width: 100%;
		height: 32px;
	}

	.property img 
	{
		width: 32px;
	}
</style>

<div class="container">
	<div class="property">
		<img src={Assets.images.icon.icon_module_silver}/>
		{silver.toLocaleString()}
	</div>

	<div class="property">
		<img src={Assets.images.icon.icon_module_gold}/>
		{gold.toLocaleString()}
	</div>
</div>