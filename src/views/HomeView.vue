<template>
  <div class="home">
    <FilterNav @filterChange="filterChange" :current="current" />
    <div v-if="projects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <SingleProject
          :project="project"
          @delete="handleDelete"
          @complete="handleComplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SingleProject from '../components/SingleProject.vue';
import FilterNav from '@/components/FilterNav.vue';

export default {
  name: 'HomeView',
  components: { SingleProject, FilterNav },
  data() {
    return {
      projects: [],
      filteredProjects: [],
      current: 'all'
    };
  },
  mounted() {
    fetch('http://localhost:3000/projects')
      .then((res) => res.json())
      .then((data) => {
        this.projects = data;
        this.filteredProjects = this.projects;
      })
      .catch((err) => console.log(err.message));
  },
  methods: {
    handleDelete(id) {
      this.projects = this.projects.filter((project) => {
        return project.id !== id;
      });
    },
    handleComplete(id) {
      let project = this.projects.find((project) => {
        return project.id === id;
      });
      project.complete = !project.complete;
    },
    filterChange(event) {
      this.current = event;
      if (event === 'completed') {
        this.filteredProjects = this.projects.filter((project) => {
          return project.complete;
        });
      } else if (event === 'ongoing') {
        this.filteredProjects = this.projects.filter((project) => {
          return !project.complete;
        });
      } else {
        this.filteredProjects = this.projects;
      }
    }
  }
};
</script>
