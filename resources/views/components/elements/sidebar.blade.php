<div class="main-sidebar sidebar-style-2">
    <aside id="sidebar-wrapper">
        <div class="sidebar-brand">
            <a href="{{ route('admin') }}">Simaku</a>
        </div>
        <div class="sidebar-brand sidebar-brand-sm">
            <a href="{{ route('admin') }}">SMK</a>
        </div>
        <ul class="sidebar-menu">
            <li class="menu-header">Dashboard</li>
            <li class="{{ Request::is('admin') ? 'active' : '' }}">
                <a class="nav-link" href="{{ route('admin') }}" id="route-admin"><i class="fas fa-home"></i>
                    <span>Dashboard</span></a>
            </li>


             {{-- student --}}
             <li
             class="nav-item dropdown {{ request()->path() === 'admin/student' || request()->path() === 'admin/active-student' ? 'active' : '' }}">
             <a href="#" class="nav-link has-dropdown" data-toggle="dropdown"><i class="fas fa-users"></i>
                 <span>Siswa</span></a>
             <ul class="dropdown-menu">
                 <li class="{{ request()->path() === 'admin/student' ? 'active' : '' }}">
                     <a class="nav-link" href="{{ route('admin.student.index') }}">
                         <span>Data</span></a>
                 </li>
                 <li class="{{ request()->path() === 'admin/student/active-student' ? 'active' : '' }}">
                     <a class="nav-link" href="{{ route('admin.active-student.index') }}">
                         <span>Aktif</span></a>
                 </li>
             </ul>
         </li>



        </ul>

    </aside>
</div>
