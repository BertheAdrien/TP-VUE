<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="container mx-auto p-6 max-w-7xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Gestion des Groupes</h1>
          <p class="text-slate-600 mt-2 text-lg">Organisez et gérez vos groupes d'utilisateurs</p>
        </div>
        <Button class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus class="w-4 h-4" />
          Nouveau groupe
        </Button>
      </div>

      <!-- Search and filters -->
      <Card class="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent class="p-6">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <div class="relative">
                <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher un groupe..."
                  class="w-full pl-12 pr-4 py-3 border-0 rounded-xl bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>
            <Button variant="outline" class="flex items-center gap-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 rounded-xl px-6">
              <Filter class="w-4 h-4" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Groups grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Group card 1 -->
        <Card class="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white shadow-lg">
          <CardContent class="p-8">
            <div class="flex items-start justify-between mb-6">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Users class="w-8 h-8 text-white" />
              </div>
              <Button variant="ghost" size="sm" class="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal class="w-5 h-5 text-slate-400" />
              </Button>
            </div>
            
            <h3 class="text-xl font-bold text-slate-900 mb-3">Équipe de Développement</h3>
            <p class="text-slate-600 mb-6 leading-relaxed">Développeurs frontend et backend travaillant sur les projets web</p>
            
            <div class="flex items-center justify-between">
              <div class="flex -space-x-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-3 border-white shadow-md"></div>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-3 border-white shadow-md"></div>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-3 border-white shadow-md"></div>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 border-3 border-white shadow-md flex items-center justify-center">
                  <span class="text-xs text-white font-semibold">+5</span>
                </div>
              </div>
              <div class="text-right">
                <span class="text-2xl font-bold text-slate-900">8</span>
                <p class="text-sm text-slate-500">membres</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Group card 2 -->
        <Card class="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white shadow-lg">
          <CardContent class="p-8">
            <div class="flex items-start justify-between mb-6">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <CheckCircle class="w-8 h-8 text-white" />
              </div>
              <Button variant="ghost" size="sm" class="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal class="w-5 h-5 text-slate-400" />
              </Button>
            </div>
            
            <h3 class="text-xl font-bold text-slate-900 mb-3">Marketing Digital</h3>
            <p class="text-slate-600 mb-6 leading-relaxed">Équipe chargée des campagnes marketing et des réseaux sociaux</p>
            
            <div class="flex items-center justify-between">
              <div class="flex -space-x-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-3 border-white shadow-md"></div>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-3 border-white shadow-md"></div>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-3 border-white shadow-md"></div>
              </div>
              <div class="text-right">
                <span class="text-2xl font-bold text-slate-900">3</span>
                <p class="text-sm text-slate-500">membres</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Group card 3 -->
        <Card class="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white shadow-lg">
          <CardContent class="p-8">
            <div class="flex items-start justify-between mb-6">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Settings class="w-8 h-8 text-white" />
              </div>
              <Button variant="ghost" size="sm" class="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal class="w-5 h-5 text-slate-400" />
              </Button>
            </div>
            
            <h3 class="text-xl font-bold text-slate-900 mb-3">Support Client</h3>
            <p class="text-slate-600 mb-6 leading-relaxed">Équipe dédiée à l'assistance et à la satisfaction client</p>
            
            <div class="flex items-center justify-between">
              <div class="flex -space-x-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-3 border-white shadow-md"></div>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-3 border-white shadow-md"></div>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-3 border-white shadow-md"></div>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 border-3 border-white shadow-md flex items-center justify-center">
                  <span class="text-xs text-white font-semibold">+2</span>
                </div>
              </div>
              <div class="text-right">
                <span class="text-2xl font-bold text-slate-900">5</span>
                <p class="text-sm text-slate-500">membres</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Empty state overlay (hidden by default) -->
      <div v-if="false" class="text-center py-16">
        <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center mx-auto mb-8">
          <Users class="w-12 h-12 text-slate-400" />
        </div>
        <h3 class="text-2xl font-bold text-slate-900 mb-4">Aucun groupe trouvé</h3>
        <p class="text-slate-600 mb-8 text-lg">Commencez par créer votre premier groupe</p>
        <Button class="flex items-center gap-2 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus class="w-4 h-4" />
          Créer un groupe
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Plus, Search, Filter, Users, CheckCircle, Settings, MoreHorizontal } from 'lucide-vue-next'
</script>