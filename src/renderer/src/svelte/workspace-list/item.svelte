<script>
    export let img;
</script>

<style>
    .container 
    {
        position: relative;
        width: 48px;
        height: 48px;
        border-radius: 100%;
        margin: 4px 0;
        overflow: hidden;
    }

    img 
    {
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
    }
</style>

<div class="container" on:click>
    <img src={img} />
</div>

