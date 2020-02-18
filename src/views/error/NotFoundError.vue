<template>
    <div class="error">
        <div class="text-box">
            <h3>该内容已删除</h3>
        </div>
        <div class="img-box">
            <img src="../../assets/logo-c.png">
        </div>
    </div>
</template>
<script>
    export default {
        name: "Error"
    }
</script>
<style lang="scss">
    .error {
        height: 95%;
        position: relative;
        text-align: center;

        .text-box {
            width: 100%;
            position: absolute;
            top: 17%;
        }

        .img-box {
            top: 93%;
            position: absolute;
            width: 100%;

            img {
                width: 29vw;
            }
        }
    }
</style>
