<template>
  <div class="container">
    <Nav />
    <div class="container">
        <form class="form-horizontal" role="form">
            <fieldset>
            <legend>Send transaction</legend>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="card-holder-name">Address</label>
                <div class="col-sm-9">
                <input type="text" class="form-control" name="card-holder-name" id="card-holder-name">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="card-number">Amount</label>
                <div class="col-sm-9">
                <input type="text" class="form-control" name="card-number" id="card-number" placeholder="Transfer amount">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="cvv">Password</label>
                <div class="col-sm-3">
                <input type="text" class="form-control" name="cvv" id="cvv" placeholder="Password">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-9">
                <button type="button" class="btn btn-success">Send</button>
                </div>
            </div>
            </fieldset>
        </form>
        </div>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'

export default {
  name: "transfer",
  data: {
  },
  components: {
    Nav
  }
};
</script>