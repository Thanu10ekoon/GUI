﻿#pragma checksum "..\..\..\Dashboard.xaml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "0D6A451D1C69657C6A14C4DC25C5FFD4838B1947"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Controls.Ribbon;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;


namespace Reps_Sheet {
    
    
    /// <summary>
    /// Dashboard
    /// </summary>
    public partial class Dashboard : System.Windows.Window, System.Windows.Markup.IComponentConnector {
        
        
        #line 13 "..\..\..\Dashboard.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.MediaElement BackgroundVideo;
        
        #line default
        #line hidden
        
        
        #line 30 "..\..\..\Dashboard.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.ListBox DateListBox;
        
        #line default
        #line hidden
        
        
        #line 46 "..\..\..\Dashboard.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.ListView WorkoutsListView;
        
        #line default
        #line hidden
        
        
        #line 92 "..\..\..\Dashboard.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button Add_btn;
        
        #line default
        #line hidden
        
        
        #line 116 "..\..\..\Dashboard.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox WorkoutNameTextBox;
        
        #line default
        #line hidden
        
        
        #line 130 "..\..\..\Dashboard.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox RepsTextBox;
        
        #line default
        #line hidden
        
        
        #line 144 "..\..\..\Dashboard.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.DatePicker DateDonePicker;
        
        #line default
        #line hidden
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "9.0.0.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/Reps-Sheet;component/dashboard.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\..\Dashboard.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);
            
            #line default
            #line hidden
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "9.0.0.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 1:
            this.BackgroundVideo = ((System.Windows.Controls.MediaElement)(target));
            
            #line 20 "..\..\..\Dashboard.xaml"
            this.BackgroundVideo.MediaEnded += new System.Windows.RoutedEventHandler(this.BackgroundVideo_MediaEnded);
            
            #line default
            #line hidden
            return;
            case 2:
            this.DateListBox = ((System.Windows.Controls.ListBox)(target));
            
            #line 31 "..\..\..\Dashboard.xaml"
            this.DateListBox.SelectionChanged += new System.Windows.Controls.SelectionChangedEventHandler(this.DateListBox_SelectionChanged);
            
            #line default
            #line hidden
            return;
            case 3:
            this.WorkoutsListView = ((System.Windows.Controls.ListView)(target));
            
            #line 48 "..\..\..\Dashboard.xaml"
            this.WorkoutsListView.SelectionChanged += new System.Windows.Controls.SelectionChangedEventHandler(this.WorkoutsListView_SelectionChanged);
            
            #line default
            #line hidden
            return;
            case 4:
            this.Add_btn = ((System.Windows.Controls.Button)(target));
            
            #line 87 "..\..\..\Dashboard.xaml"
            this.Add_btn.Click += new System.Windows.RoutedEventHandler(this.AddWorkout_Click);
            
            #line default
            #line hidden
            return;
            case 5:
            
            #line 95 "..\..\..\Dashboard.xaml"
            ((System.Windows.Controls.Button)(target)).Click += new System.Windows.RoutedEventHandler(this.UpdateWorkout_Click);
            
            #line default
            #line hidden
            return;
            case 6:
            
            #line 102 "..\..\..\Dashboard.xaml"
            ((System.Windows.Controls.Button)(target)).Click += new System.Windows.RoutedEventHandler(this.DeleteWorkout_Click);
            
            #line default
            #line hidden
            return;
            case 7:
            this.WorkoutNameTextBox = ((System.Windows.Controls.TextBox)(target));
            return;
            case 8:
            this.RepsTextBox = ((System.Windows.Controls.TextBox)(target));
            return;
            case 9:
            this.DateDonePicker = ((System.Windows.Controls.DatePicker)(target));
            return;
            }
            this._contentLoaded = true;
        }
    }
}

