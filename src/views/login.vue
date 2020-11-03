<template>
    <div class="login-wrapper">
        <div id="wx_reg"></div>
    </div>
</template>

<script>
  import md5 from 'md5'

  export default {
    name: "login",
    mounted() {
      console.log(window.location.host)
      const QYWX = 'ZugwYmgX6Ve2addsZ1VrRRSdG0v6UlIRi9RfT8vC8hC7eElX'

      const callback = 'http://lsdk.dev.ehafo.com/oauth/qywx/login_callback.php'
      const referer = 'http://' + window.location.host
      const sign = md5(callback + QYWX)
      window.WwLogin({
        "id": "wx_reg",
        "appid": "wwee44a4d1450c9620",
        "agentid": "1000004",
        "redirect_uri": encodeURIComponent(`http://sdk.ehafo.com/oauth/qywx/callback.php?callback=${callback}&referer=${referer}&sign=${sign}`),
        "state": "1"
      });
    }
  }
</script>

<style scoped>
    .login-wrapper {
        position: absolute;
        width: 300px;
        height: 400px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
</style>