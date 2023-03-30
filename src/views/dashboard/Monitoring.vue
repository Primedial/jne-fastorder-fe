<template>
  <div>
    <el-card class="bg-primary mt-3 mb-2">
      <h4 class="text-light">Total Kiriman</h4>
      <h1 class="text-right text-light">0</h1>
    </el-card>
    <el-card>
      <h2 class="my-0">Monitoring</h2>
      <el-divider></el-divider>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="Penerima"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Tanggal Input"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="Resi"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="Tipe Kiriman"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="Drop/Pick Up"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="Status Kiriman"
          sortable
        >
        </el-table-column>
      </el-table>
      <div class="flex justify-between items-center mt-2">
        <el-pagination
          layout="prev, pager, next"
          :total="50"
        >
        </el-pagination>
        <small>Total: <strong>50</strong></small>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
};
</script>
